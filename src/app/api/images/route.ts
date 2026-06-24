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

// GET: Lấy danh sách ảnh trong thư mục public/images
export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const imagesDir = path.join(process.cwd(), 'public/images');
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(imagesDir);
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.JPG', '.JPEG', '.PNG', '.WEBP'];
    const imageFiles = files
      .filter(file => allowedExtensions.includes(path.extname(file)))
      .map(file => `/images/${file}`);

    return NextResponse.json(imageFiles);
  } catch (error: any) {
    console.error("Failed to read images directory:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Tải ảnh mới lên và lưu vào public/images
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

    // Kiểm tra định dạng tệp
    const ext = path.extname(file.name).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json({ error: 'Định dạng tệp không được hỗ trợ. Chỉ cho phép JPG, PNG, WEBP, GIF, SVG.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imagesDir = path.join(process.cwd(), 'public/images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    // Đọc danh sách file để tìm số thứ tự {stt} lớn nhất của tệp me-{stt}.ext
    const files = fs.readdirSync(imagesDir);
    let maxIndex = 0;
    files.forEach(f => {
      const match = f.match(/^me-(\d+)\.[a-zA-Z0-9]+$/i);
      if (match) {
        const index = parseInt(match[1], 10);
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
    });

    const newIndex = maxIndex + 1;
    const filename = `me-${newIndex}${ext}`;
    const filePath = path.join(imagesDir, filename);
    fs.writeFileSync(filePath, buffer);

    const url = `/images/${filename}`;
    return NextResponse.json({ success: true, url });
  } catch (error: any) {
    console.error("Failed to upload image:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Xóa ảnh vật lý khỏi thư mục public/images
export async function DELETE(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url } = await request.json();
    if (!url || !url.startsWith('/images/')) {
      return NextResponse.json({ error: 'Đường dẫn ảnh không hợp lệ' }, { status: 400 });
    }

    const filename = path.basename(url);
    const imagesDir = path.join(process.cwd(), 'public/images');
    const filePath = path.join(imagesDir, filename);

    // Không cho phép xóa các file nằm ngoài thư mục public/images bằng cách path traversal
    const relativePath = path.relative(imagesDir, filePath);
    if (relativePath.includes('..') || path.isAbsolute(relativePath)) {
      return NextResponse.json({ error: 'Không có quyền truy cập tệp tin ngoài thư mục ảnh' }, { status: 403 });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      // Nếu file không tồn tại vật lý nhưng được yêu cầu xóa, ta vẫn trả về thành công để đồng bộ
      return NextResponse.json({ success: true, warning: 'Tệp tin không tồn tại trên máy chủ' });
    }
  } catch (error: any) {
    console.error("Failed to delete image:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
