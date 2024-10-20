"use client"

import Image from "next/image";


import React, { useEffect,useState } from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';
import { redirect } from "next/navigation"
import FileView from "@/components/fileviewing";
import Diagram from "@/components/diagram";


  
export default function Home() {

    const [files, filesSelected] = useState(true)

    const{data:session, update, status} = useSession();

    const ContentViewer = ({ content } : any) => {
        if (!content) {
          return <div className="p-4 text-gray-500">No content selected</div>;
        }
      
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{content.name}</h2>
            <pre className="bg-gray-100 p-4 rounded">{content.content}</pre>
          </div>
        );
      };

    
    if(status === 'loading')
    {
        return (
            <>loading</>
        )   
    }
    if (!session?.user)
    {
        redirect("/")
    }
    return (
        <div className="font-[family-name:var(--font-geist-sans)]">
            <div className="p-2 flex flex-row gap-x-2 ">
                <h3 className="text-[3.5vw] sm:text-[1.5rem]">Proto.AI</h3>
                <div >
                    <button 
                    className={`hover:bg-gray-600 ${files? "border-b-2" :""} p-1 mr-2`}
                    onClick={()=>filesSelected(true)}
                    >
                        files</button>
                    <button className={`hover:bg-gray-600 p-1 ${!files? "border-b-2" :""} `} onClick={()=>filesSelected(false)}>diagram</button>
                </div>
                
                
            </div>
            {(files) ? <FileView session={session} status={status}/>: 
            <Diagram/>
            
            }
            
        </div> 
    );
}
