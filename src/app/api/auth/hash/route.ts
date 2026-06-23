import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password') || 'admin';
  const hash = hashPassword(password);
  
  return NextResponse.json({ 
    password, 
    hash,
    instruction: "Sao chép giá trị 'hash' này vào biến môi trường ADMIN_PASSWORD_HASH trong file .env"
  });
}
