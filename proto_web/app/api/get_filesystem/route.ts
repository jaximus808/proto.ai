import { authOptions } from '@/app/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';

import {getSession} from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

type ResponseData = {
    success:boolean
    filesys?: string
    error?: string
}
 
async function GET(
    req: NextRequest,
) {
    try{

    const session = await getServerSession(authOptions)
    if(!session?.user)
    {
        return NextResponse.json({ success:false, error:"not logged in "}, {status: 400})
    }

        const gmail = session.user.email

        const file_data = await fetch("http://127.0.0.1:4000/dir_read", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            gmail: gmail
            })
        })

        const files = await file_data.json()
        console.log(files)

        return NextResponse.json({ success:true, filesys:files}, {status:200})
    }
    catch(e)
    {
        console.log(e)
        return NextResponse.json({ success:false, error:"something went wrong"}, {status:400}) 
    }
}



async function POST( req:NextRequest)
{

    NextResponse.json( {error:true}, {status:200})
}

export {GET, POST}