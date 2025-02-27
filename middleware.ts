import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Вимкнено авторизацію для доступу до віджету погоди
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}; 