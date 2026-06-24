import { NextResponse } from 'next/server';

export async function GET() {
  const storedHash = process.env.ADMIN_PASSWORD_HASH;
  const isSetup = !!(storedHash && storedHash.trim() !== "");
  
  return NextResponse.json({ isSetup });
}
