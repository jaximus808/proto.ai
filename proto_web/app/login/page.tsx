"use client"
import { googleLogin } from "@/app/action";
import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

export default function Login() {
  /**
   * Handles Google Login by redirecting to Google's OAuth page.
   */
    const{data:session} = useSession();

    const Login = () =>
    {
        try
        {
            const res =  signIn('google')

        }
        catch(error)
        {
            console.log(error)
        }
    }
  /**
   * Render the login button with the onClick handler.
   */
  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Login</h1>
      <form action={googleLogin}>
        <button className="bg-pink-400 text-white p-1 rounded-md m-1 text-lg" type="submit" name="action" value="google">
                    Sign In With Google
        </button>
      </form>
      <button onClick={Login} style={{
        backgroundColor: '#4285F4',  // Google Blue
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    }}>Login with Google</button>
    </div>
  );
}