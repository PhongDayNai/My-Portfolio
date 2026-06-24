import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { verifyJWT } from '@/lib/jwt';

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

// GET: Lấy danh sách tài liệu trong thư mục public/uploads
export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(uploadsDir);
    const allowedExtensions = ['.pdf', '.docx', '.doc'];
    
    const documentFiles = files
      .filter(file => allowedExtensions.includes(path.extname(file).toLowerCase()))
      .map(file => {
        const filePath = path.join(uploadsDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          url: `/uploads/${file}`,
          size: stats.size, // bytes
          uploadedAt: stats.mtime.toISOString(),
        };
      })
      // Sắp xếp file mới nhất lên đầu
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return NextResponse.json(documentFiles);
  } catch (error: any) {
    console.error("Failed to read uploads directory:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Tải tài liệu mới lên và lưu vào public/uploads
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

    // 4. Làm sạch tên file (Filename Sanitization) để phòng chống Path Traversal
    const baseName = path.basename(file.name, path.extname(file.name));
    const cleanBaseName = baseName
      .toLowerCase()
      // Chuyển ký tự tiếng Việt có dấu thành không dấu hoặc loại bỏ ký tự lạ
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_-]/g, '_')
      .replace(/__+/g, '_');
    
    const filename = `${cleanBaseName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // 5. Ghi tệp tin
    fs.writeFileSync(filePath, buffer);

    const url = `/uploads/${filename}`;
    return NextResponse.json({ 
      success: true, 
      document: {
        name: filename,
        url,
        size: file.size,
        uploadedAt: new Date().toISOString()
      } 
    });
  } catch (error: any) {
    console.error("Failed to upload document:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Xóa tài liệu khỏi thư mục public/uploads
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
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: true, warning: 'Tệp tin không tồn tại trên máy chủ' });
    }
  } catch (error: any) {
    console.error("Failed to delete document:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
