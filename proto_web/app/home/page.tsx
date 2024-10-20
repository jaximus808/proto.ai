"use client"

import Image from "next/image";


import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
export default function Home() {
    const{data:session, update, status} = useSession();

    if(status === 'loading')
    {
        return (
            <>loading</>
        )   
    }
    if (!session?.user)
    {
        return (
            <>
            
                <div>Sorry you're not logged in</div>

            </>
        )   
    }
    return (
        <>
            
            <div>Yay ur logged in!</div>

        </>
    );
}
