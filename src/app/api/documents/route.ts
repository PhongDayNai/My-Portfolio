import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { verifyJWT } from '@/lib/jwt';
import { getPortfolioData, savePortfolioData } from '@/lib/portfolio';
import { revalidatePath } from 'next/cache';

async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('session')?.value;
    if (!sessionToken) return false;
    
    const secret = process.env.JWT_SECRET || 'fallback_secret_key_12345678';
    const payload = await verifyJWT(sessionToken, secret);
    return !!payload;
  } catch (error) {
    return false;
  }
}

function sanitizeFilename(titleEn: string): string {
  return titleEn
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_-]/g, '_')
    .replace(/__+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// GET: Lấy danh sách tài liệu từ portfolio.json
export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const portfolio = await getPortfolioData();
    const docs = portfolio.documents || [];
    
    // Sắp xếp file mới nhất lên đầu
    const sortedDocs = [...docs].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    return NextResponse.json(sortedDocs);
  } catch (error: any) {
    console.error("Failed to read documents from portfolio.json:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Tải tài liệu mới lên, lưu vào public/uploads và cập nhật portfolio.json
export async function POST(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp tải lên' }, { status: 400 });
    }

    const titleVi = formData.get('titleVi') as string || '';
    const titleEn = formData.get('titleEn') as string || '';

    if (!titleVi || !titleEn) {
      return NextResponse.json({ error: 'Vui lòng cung cấp cả tiêu đề tiếng Việt và tiếng Anh' }, { status: 400 });
    }

    // 1. Kiểm tra định dạng tệp (Extension Validation)
    const ext = path.extname(file.name).toLowerCase();
    const allowedExtensions = ['.pdf', '.docx', '.doc'];
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: 'Định dạng tệp không được hỗ trợ. Chỉ cho phép .pdf, .docx, .doc.' }, { status: 400 });
    }

    // 2. Kiểm tra dung lượng tệp (Size Validation - Max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Dung lượng tệp quá lớn. Tối đa là 5MB.' }, { status: 400 });
    }

    // 3. Đọc dữ liệu tệp tin
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 4. Chuẩn hóa tên file theo tiêu đề tiếng Anh
    const cleanBaseName = sanitizeFilename(titleEn) || 'document';
    const filename = `${cleanBaseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // 5. Ghi tệp tin
    fs.writeFileSync(filePath, buffer);

    const url = `/uploads/${filename}`;
    const newDoc = {
      name: filename,
      title: {
        vi: titleVi,
        en: titleEn
      },
      url,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    // 6. Cập nhật vào portfolio.json
    try {
      const portfolio = await getPortfolioData();
      const currentDocs = portfolio.documents || [];
      portfolio.documents = [...currentDocs, newDoc];
      await savePortfolioData(portfolio);
      revalidatePath("/");
      revalidatePath("/settings");
    } catch (err) {
      console.error("Failed to auto-update portfolio.json on document upload:", err);
    }

    return NextResponse.json({ 
      success: true, 
      document: newDoc
    });
  } catch (error: any) {
    console.error("Failed to upload document:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Cập nhật thông tin tài liệu và đổi tên tệp tin vật lý tương ứng trên disk
export async function PUT(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url, titleVi, titleEn } = await request.json();
    if (!url || !url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Đường dẫn tài liệu không hợp lệ' }, { status: 400 });
    }

    if (!titleVi || !titleEn) {
      return NextResponse.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
    }

    const portfolio = await getPortfolioData();
    const docs = portfolio.documents || [];
    const docIndex = docs.findIndex((d: any) => d.url === url);

    if (docIndex === -1) {
      return NextResponse.json({ error: 'Tài liệu không tồn tại trong hệ thống' }, { status: 404 });
    }

    const doc = docs[docIndex];
    const oldFilename = doc.name;
    const oldTitleEn = doc.title.en;

    doc.title.vi = titleVi;

    if (titleEn !== oldTitleEn) {
      const ext = path.extname(oldFilename).toLowerCase();
      const uploadsDir = path.join(process.cwd(), 'public/uploads');
      const oldFilePath = path.join(uploadsDir, oldFilename);

      // Trích xuất timestamp từ tên file cũ
      const match = oldFilename.match(/_(\d+)\.[a-z0-9]+$/i);
      const timestamp = match ? match[1] : Date.now().toString();
      
      const cleanBaseName = sanitizeFilename(titleEn) || 'document';
      const newFilename = `${cleanBaseName}_${timestamp}${ext}`;
      const newFilePath = path.join(uploadsDir, newFilename);
      const newUrl = `/uploads/${newFilename}`;

      // Thực hiện đổi tên file vật lý trên disk
      if (fs.existsSync(oldFilePath)) {
        const oldRel = path.relative(uploadsDir, oldFilePath);
        const newRel = path.relative(uploadsDir, newFilePath);
        if (oldRel.includes('..') || path.isAbsolute(oldRel) || newRel.includes('..') || path.isAbsolute(newRel)) {
          return NextResponse.json({ error: 'Không có quyền truy cập tệp tin ngoài thư mục tài liệu' }, { status: 403 });
        }

        fs.renameSync(oldFilePath, newFilePath);
      }

      doc.name = newFilename;
      doc.url = newUrl;
      doc.title.en = titleEn;
    } else {
      doc.title.en = titleEn;
    }

    docs[docIndex] = doc;
    portfolio.documents = docs;
    
    await savePortfolioData(portfolio);
    revalidatePath("/");
    revalidatePath("/settings");

    return NextResponse.json({ success: true, document: doc });
  } catch (error: any) {
    console.error("Failed to update document:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Xóa tài liệu khỏi thư mục public/uploads và portfolio.json
export async function DELETE(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    if (!url || !url.startsWith('/uploads/')) {
      return NextResponse.json({ error: 'Đường dẫn tài liệu không hợp lệ' }, { status: 400 });
    }

    const filename = path.basename(url);
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadsDir, filename);

    // Bảo mật: Không cho phép xóa các file ngoài thư mục public/uploads (Path Traversal)
    const relativePath = path.relative(uploadsDir, filePath);
    if (relativePath.includes('..') || path.isAbsolute(relativePath)) {
      return NextResponse.json({ error: 'Không có quyền truy cập tệp tin ngoài thư mục tài liệu' }, { status: 403 });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Xóa khỏi portfolio.json
    try {
      const portfolio = await getPortfolioData();
      const currentDocs = portfolio.documents || [];
      const updatedDocs = currentDocs.filter((doc: any) => doc.url !== url);

      if (updatedDocs.length !== currentDocs.length) {
        portfolio.documents = updatedDocs;
        await savePortfolioData(portfolio);
        revalidatePath("/");
        revalidatePath("/settings");
      }
    } catch (err) {
      console.error("Failed to auto-remove document from portfolio.json on delete:", err);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to delete document:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
