import { authOptions } from '@/app/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';

import {getSession} from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    // Parse the incoming JSON from the request body
    if(!request.body) throw "misisng body"
    const body = await request.json()
    const {diagramJson} = body
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json(
        { success: false, error: 'not logged in' },
        { status: 400 })
    // Make a POST request to localhost:3000
    const response = await fetch('http://127.0.0.1:4000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        diagram: diagramJson,
        email:session?.user?.email
    }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // Return a success response
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error('Error processing diagram:', error);

    // Return an error response
    return NextResponse.json(
      { success: false, error: 'Failed to process diagram' },
      { status: 500 }
    );
  }
}