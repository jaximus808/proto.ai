
'use client'

import { signIn, signOut} from "next-auth/react"

export async function googleLogin(formData:any) {
    try{
        const action = formData.get('action');
         signIn("google");
    }
    catch(e)
    {
        console.log(e)
    }
   
}

export async function doLogout() {
  await signOut();
}