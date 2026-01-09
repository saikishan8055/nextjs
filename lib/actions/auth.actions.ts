'use server';

import { db ,auth} from "@/components/firebase/admin";
import { CollectionReference, DocumentData, DocumentReference } from "firebase-admin/firestore";
import { get } from "http";
import { cookies } from "next/headers";
import { success } from "zod";
import { de, id } from "zod/v4/locales";
const ONE_WEEK = 60*60*24*7

export async function SignUp(params:SignUpParams){
    const {uid,name,email}=params;
    try {
        const userRecord = await db.collection('users').doc(uid).get()
        if(userRecord.exists){
            return{
                success:false,
                message:'User already exists.Please sign in instead'
            }


        }
        await db.collection('users').doc(uid).set({
            name,email
        })
        return{
            success:true,
            message:'Account created successfully .Please Sign In '
        }

    }catch(e:any){
        console.error('Error creating a user',e);
        if(e.code === 'auth/email-already-exists'){
            return{
                succes:false,
                message:'This E-mail is already in use'
            }

        }
        return{
            success:false,
            message:'Failed to create an account'
        }

    }
    
}
export async function SignIn(params:SignInParams){
    const {email,idToken} = params
    try{
        const userRecord = await auth.getUserByEmail(email)
        if(!userRecord){
            return{
                success:false,
                message : 'User does not exist.Create an accoungt instsead'

            }
        }
        await setSessionCookies(idToken);
    }catch(e){
        console.log(e);
        return{
            success:false,
            message:'failed to login into the account'
        }
    }

}
export async function setSessionCookies(idToken : string){
    const cookieStore = await   cookies()
    const sessionCookies = await auth.createSessionCookie(idToken,{
        expiresIn:ONE_WEEK*1000,
    })
    cookieStore.set('session',sessionCookies,{
        maxAge:ONE_WEEK,
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        path:'/',
        sameSite:'lax'
         
    })

}
export async function getCurrentuser(): Promise<User|null>{
    const cookieStore = await cookies();
    const sessionCookies = cookieStore.get('session')?.value;
    if(!sessionCookies) return null;
    try{
        const decodeClaims = await auth.verifySessionCookie(sessionCookies,true);
        const userRecord = await db
        .collection('users')
        .doc(decodeClaims.uid)
        .get()
        if(!userRecord.exists) return null
        return {
            ...userRecord.data(),
            id:userRecord.id,
        }as User;


    }catch(e){
        console.log(e)
        return null
    }

}
export async function isAuthenticated(){
    const user = await getCurrentuser()
    return !!user;
}