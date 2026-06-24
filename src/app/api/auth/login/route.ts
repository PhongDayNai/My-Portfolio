import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyPassword, getAdminPasswordHash } from '@/lib/auth';
import { signJWT } from '@/lib/jwt';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const storedHash = getAdminPasswordHash();

    if (!storedHash) {
      console.error("ADMIN_PASSWORD_HASH is not configured in .env");
      return NextResponse.json(
        { error: 'Cấu hình hệ thống chưa hoàn tất. Vui lòng thiết lập ADMIN_PASSWORD_HASH.' },
        { status: 500 }
      );
    }

    // Verify username and password
    const isUsernameMatch = username === expectedUsername;
    const isPasswordMatch = verifyPassword(password, storedHash);

    if (isUsernameMatch && isPasswordMatch) {
      const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345678';
      
      // Session lasts for 24 hours
      const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
      const token = await signJWT(
        {
          username,
          role: 'admin',
          exp: expiry,
        },
        jwtSecret
      );

      // Set cookie in Next.js 15/16
      const cookieStore = await cookies();
      cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours in seconds
      });

      return NextResponse.json({ success: true, redirect: '/settings' });
    }

    // Artificial delay of 1 second on failed login to mitigate brute-force attacks
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi trong quá trình xử lý.' },
      { status: 500 }
    );
  }
}
