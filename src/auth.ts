import NextAuth from "next-auth"
import { authConfig } from "./auth.config";
import CredentialsProvider from 'next-auth/providers/credentials';
// import { User } from '@/app/lib/models' ;
// import { connectToDB } from '@/app/lib/utils';
import bcrypt from 'bcrypt';
import Credentials from "next-auth/providers/credentials";
import {z} from 'zod';
import { User } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";

const login = async (userName:string,password:string) =>{
    try{
        connectToDB();
        const user = await User.findOne({username:userName});

        if (!user) throw new Error("Wrong user!");
        // const isPasswordCorrect = await bcrypt.compare(password, user.password);
        let isPasswordCorrect = false;
        if (password === user.password) {isPasswordCorrect = true}

        if (!isPasswordCorrect) throw new Error("Wrong pass!");
        return user;
    } catch(err) { 
        console.log(err);
    }
}

export const {auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers:[
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({username:z.string(),password:z.string()})
                .safeParse(credentials);

                if (parsedCredentials.success) {
                    const {username,password} = parsedCredentials.data; 
                    const user = await login(username,password);
                    if (user) return user;
                }
                return null;

            }
        })
    ]
});