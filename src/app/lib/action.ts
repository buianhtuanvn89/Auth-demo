'use server'

import { signIn } from "@/auth"
import { AuthError } from "next-auth";
import { connectToDB } from "./utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { userBatch } from "../dashboard/newUser/page";
import { User } from "./models";
import { ObjectId } from "mongoose";

export const authenticate = async (prevState:string|undefined,FormData: FormData) =>{
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
        };
        console.log(err)
        throw err;
    }
}

// export const CreateUser = async (FormData:FormData) => {
//     const {username, email, password} = Object.fromEntries(FormData);
//     try{
//         connectToDB();
//     const newUser = new User({
//         username,
//         email,
//         password,
//     })
//     await newUser.save();
//     } catch(error) {
//         console.log(error);
//         throw new Error("Failed to register") 
//     }
//     revalidatePath('/dashboard');
//     redirect('/dashboard');
// }   

export const CreateUserBatch = (FormData:FormData) => {
    try{
        connectToDB();
        userBatch.map(async user => {
            const usernameForm = `name${user}`;
            const emailForm = `email${user}`;
            const passwordForm = `password${user}`;
            const username = FormData.get(usernameForm);
            const email = FormData.get(emailForm);
            const password = FormData.get(passwordForm);
            const newUser = new User({
                username,
                email,
                password,
            })
            await newUser.save();  
        })  
    } catch(err) {
        console.log(err);
        throw new Error('Failed to create User Batch');
    };
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export const DeleteUser = async (id:ObjectId)=>{
    try{
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
        throw new Error('Failed to delete')
    }
    revalidatePath('/dashboard');
}