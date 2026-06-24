import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { verifyJWT } from '@/lib/jwt';
import { verifyPassword, hashPassword } from '@/lib/auth';

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

// POST: Thay đổi mật khẩu admin
export async function POST(request: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Vui lòng điền đầy đủ thông tin mật khẩu.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu mới phải có độ dài ít nhất 6 ký tự.' }, { status: 400 });
    }

    const storedHash = process.env.ADMIN_PASSWORD_HASH;
    if (!storedHash) {
      return NextResponse.json({ error: 'Không tìm thấy cấu hình mật khẩu hiện tại trên server.' }, { status: 500 });
    }

    // 1. Kiểm tra mật khẩu hiện tại
    const isPasswordValid = verifyPassword(currentPassword, storedHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Mật khẩu hiện tại không chính xác.' }, { status: 400 });
    }

    // 2. Tạo hash mới cho mật khẩu mới
    const newHash = hashPassword(newPassword);

    // 3. Ghi đè vào file .env
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    const regex = /^ADMIN_PASSWORD_HASH=.*$/m;
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `ADMIN_PASSWORD_HASH=${newHash}`);
    } else {
      envContent += `\nADMIN_PASSWORD_HASH=${newHash}`;
    }

    try {
      fs.writeFileSync(envPath, envContent, 'utf8');
    } catch (writeError) {
      console.error("Failed to write to .env file:", writeError);
      return NextResponse.json({ error: 'Không thể cập nhật cấu hình mật khẩu trên máy chủ.' }, { status: 500 });
    }

    // 4. Cập nhật biến môi trường trong memory để có hiệu lực lập tức
    process.env.ADMIN_PASSWORD_HASH = newHash;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Password change error:", error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}
