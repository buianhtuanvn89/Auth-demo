import { NextAuthConfig } from "next-auth";
export const authConfig = {
    providers:[], 
    pages:{
        signIn: '/login',
    }, 
    callbacks:{
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = auth?.user;
            const isOnDashboard =  nextUrl.pathname.startsWith('/dashboard');
         
            console.log(isOnDashboard,"isondashboard");
            console.log(isLoggedIn,"isLoggedIn");
            
            if (isOnDashboard) {
                if (isLoggedIn) return true; 
                return false;
            };

             if((isLoggedIn) && (!isOnDashboard)){
                return Response.redirect(new URL('/dashboard',nextUrl));
            };
            return true;   
        }
        
    }, 
   

} satisfies NextAuthConfig;