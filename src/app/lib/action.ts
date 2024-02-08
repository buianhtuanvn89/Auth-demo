'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth";

export const authenticate = async (prevState:string|undefined,FormData: FormData) =>{
    // const {username,password} = Object.fromEntries(FormData);
    // console.log(FormData.get('username'),FormData.get('password'));
    try{
        await signIn('credentials',FormData);
    } catch(err) {
        if (err instanceof AuthError) {
            switch (err.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials';
                default: 
                    return 'Something went wrong';
            }
        }
        // console.error(err);
        throw err;
    }
}