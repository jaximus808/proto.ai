"use client"

import Image from "next/image";


import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
export default function Home() {
  const{data:session} = useSession();

    const Login = () =>
    {
        try
        {
            const res =  signIn('google', {callbackUrl:"/home"})

        }
        catch(error)
        {
            console.log(error)
        }
    }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center ">
        <h2 className="text-[6vw] sm:text-[2.5rem]">Welcome to</h2>
        <h1 className="text-[20vw] sm:text-[8rem]">Proto.AI</h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row ">
          
          <button onClick={Login} className="flex hover:bg-gray-200 space-x-2 justify-between items-center bg-white text-lg px-[20px] py-[10px] rounded-md text-black mt-4" 
        >
          <Image
              aria-hidden
              src="/google.png"
              alt="File icon"
              width={16}
              height={16}
            />
            <div>Login with Google</div>
            </button>
            
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.jaxonp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Connect
        </a>
        
      </footer>
    </div>
  );
}
