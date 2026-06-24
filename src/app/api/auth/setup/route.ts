import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { hashPassword, getAdminPasswordHash, saveAdminPasswordHash } from '@/lib/auth';
import { signJWT } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    // 1. Chỉ cho phép thiết lập nếu chưa có mật khẩu cấu hình
    const storedHash = getAdminPasswordHash();
    if (storedHash && storedHash.trim() !== "") {
      return NextResponse.json(
        { error: 'Hệ thống đã được thiết lập mật khẩu trước đó. Vui lòng đăng nhập.' },
        { status: 400 }
      );
    }

    const { password } = await request.json();

    if (!password || password.trim() === "") {
      return NextResponse.json({ error: 'Vui lòng nhập mật khẩu muốn thiết lập.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu phải có độ dài ít nhất 6 ký tự.' }, { status: 400 });
    }

    // 2. Tạo hash mật khẩu
    const newHash = hashPassword(password);

    // 3. Lưu mật khẩu vào file cấu hình persistent
    const isSaved = saveAdminPasswordHash(newHash);
    if (!isSaved) {
      return NextResponse.json({ error: 'Không thể lưu cấu hình mật khẩu trên máy chủ.' }, { status: 500 });
    }

    // 4. Đồng thời thử ghi đè vào file .env nếu có (fallback cho dev local)
    try {
      const envPath = path.join(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        const regex = /^ADMIN_PASSWORD_HASH=.*$/m;
        if (regex.test(envContent)) {
          envContent = envContent.replace(regex, `ADMIN_PASSWORD_HASH=${newHash}`);
        } else {
          envContent += `\nADMIN_PASSWORD_HASH=${newHash}`;
        }
        fs.writeFileSync(envPath, envContent, 'utf8');
      }
    } catch (envError) {
      console.warn("Failed to write to local .env file (expected in production Docker):", envError);
    }

    // 5. Đăng nhập trực tiếp cho người dùng
    const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345678';
    const username = process.env.ADMIN_USERNAME || 'admin';
    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24h
    
    const token = await signJWT(
      {
        username,
        role: 'admin',
        exp: expiry,
      },
      jwtSecret
    );

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ success: true, redirect: '/settings' });
  } catch (error: any) {
    console.error('Admin setup error:', error);
    return NextResponse.json(
      { error: error?.message || 'Đã xảy ra lỗi trong quá trình xử lý.' },
      { status: 500 }
    );
  }
}
