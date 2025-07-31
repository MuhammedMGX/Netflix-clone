import { getToken } from 'next-auth/jwt'
import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export default withAuth(
    async function middleware(request: NextRequest) {
        const pathname = request.nextUrl.pathname;       
        const isAuth = await getToken({ req: request });
        const isAuthRoute = pathname.startsWith('/auth');
        const protectedRoutes = ['/profile' , '/home'];
        const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));


        
        if (!isAuth && isProtectedRoute) {
            return NextResponse.redirect(new URL('/auth/landingpage', request.url));

        }
        if (isAuth && isAuthRoute) {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        return NextResponse.next(); 


},
{
  callbacks: {
    async authorized() {
      return true 
    },
}
}
);
 
 
export const config = {
  matcher: ['/profile/:path*', '/auth/:path*' , '/home' , '/'],
}


