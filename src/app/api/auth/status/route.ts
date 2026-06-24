import { NextResponse } from 'next/server';
import { getAdminPasswordHash } from '@/lib/auth';

export async function GET() {
  const storedHash = getAdminPasswordHash();
  const isSetup = !!(storedHash && storedHash.trim() !== "");
  
  return NextResponse.json({ isSetup });
}
