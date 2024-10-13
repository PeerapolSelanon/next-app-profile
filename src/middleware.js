import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { canAccessPath } from './utils/authUtils';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  // ไม่ตรวจสอบสำหรับ public routes, static files, หรือหน้า auth
  if (path.startsWith('/_next') || 
      path.startsWith('/public') || 
      path.startsWith('/auth') ||
      path.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 1. ดึง token จาก request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // 2. ถ้าไม่มี token (ไม่ได้ login) ให้ redirect ไปหน้า signin
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
  
  // ตรวจสอบว่า token มีข้อมูล role หรือไม่
  if (!token.role) {
    console.error('Token is missing role data');
    return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
  }

  // 3. ตรวจสอบว่า user มีสิทธิ์เข้าถึง path นี้หรือไม่
  if (!canAccessPath(token, path)) {
    return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
  }

  // 4. ถ้าผ่านการตรวจสอบทั้งหมด ให้ดำเนินการต่อไป
  return NextResponse.next();
}

// 5. กำหนด path ที่ต้องการให้ middleware ทำงาน
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - auth (auth pages)
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!auth|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
