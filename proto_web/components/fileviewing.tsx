
import  { useSession, signIn, signOut} from 'next-auth/react';
import type { Session } from 'next-auth';

import React, { Children, use, useEffect,useState } from 'react';

import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
interface FolderNode {
    name: string;
    type: string;
    children: FolderNode[];
    full_path: string;
}

interface SidebarProps {
    session: Session;
    status: string
}
interface FolderNode {
    name: string;
    type: string;
    children: FolderNode[];
}

interface FileSystemItemRoot {
    item: FolderNode;
    onSelect: any;
    email: string | null | undefined;
}

interface FileSystemItem {
    item: FolderNode;
    onSelect: any
}
interface Viewer {
    content: FolderNode;
}

interface HashMap {
    [key: string]: FolderNode
}

const FolderCreator  = (data:string, email:string) =>
{
    const root = {
        name: email,
        type: "folder",
        children: [],
        full_path: ""
    }
    const root_key =`/${email}/`
    
    const hash_map = {
        
    } as HashMap
    hash_map[root_key] = root
    for(let i = 0; i < data.length-1; i+=2)
    {
        console.log(hash_map)
        const isFolder = (data[i]==="0")?false:true
        const localDir = data[i+1]
        console.log(isFolder)
        console.log(localDir)
        if (isFolder) 
        {
            let name_index = 0
            for(let y = 1; y < localDir.length; y++)
            {
                if (localDir.charAt(y) === '/' )
                {
                    name_index = y
                }
            }

            let dir_name = localDir.substring(name_index) 
            let parent = localDir.substring(0, name_index + 1) 

            const newNode = {
                name: dir_name,
                type: "folder",
                children: [],
                full_path: localDir
            }    
            console.log(parent)
            hash_map[localDir + "/"] = newNode
            hash_map[parent].children.push(newNode)
        }
        else 
        {
            let name_index = 0
            for(let y = 1; y < localDir.length; y++)
            {
                if (localDir.charAt(y) === '/' )
                {
                    name_index = y
                }
            }

            let dir_name = localDir.substring(name_index) 
            let parent = localDir.substring(0, name_index + 1) 
            console.log(parent)
            const newNode = {
                name: dir_name,
                type: "file",
                children: [],
                full_path: localDir
            }    

            hash_map[parent].children.push(newNode)
        }

    }

    return root


}

const FileSystemItem = ({ item, onSelect } : FileSystemItem) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = () => {
      if (item.type === 'folder') {
        setIsOpen(!isOpen);
      }
    };
  
    return (
      <div>
        <div
          className="flex items-center cursor-pointer p-1 hover:bg-gray-100 hover:text-black"
          onClick={() => {
            toggleOpen();
            onSelect(item);
          }}
        >
          {item.type === 'folder' && (
            isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
          {item.type === 'folder' ? <Folder size={16} className="mr-2" /> : <File size={16} className="mr-2" />}
          <span>{item.name}</span>
        </div>
        {item.type === 'folder' && isOpen && (
          <div className="ml-4">
            
            {item.children.map((child) => (
              <FileSystemItem key={child.name} item={child} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>
    );
  };


  const FileSystem = ({ item, onSelect, email }:FileSystemItemRoot) => {

    console.log(item)
    return (
      <div className="p-4">
        <h3>{email}</h3>
        {item.children.map((it) => (
          <FileSystemItem key={it.name} item={it} onSelect={onSelect} />
        ))}
      </div>
    );
  };


  const ContentViewer = ({content} :Viewer) => {
    
    const [data, setData] = useState()
    
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>
    {
        const getFolderData = async () =>
        {
            const data = await fetch("/api/get_file")

            const file_text = await data.json()
            console.log(file_text)
            setData(file_text)
            setLoading(false)
        }
    
    }, [content.full_path])
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{content.name}</h2>
        { (loading) ? 
            <div>Loading</div>
                :
            <pre className="bg-gray-100 p-4 rounded">{data}</pre> 
        }
        
      </div>
    );
  };
  

export default function FileView(props: SidebarProps) 
{
    const [folders, setFolder] = useState<FolderNode>()
    const [loading, setLoading] = useState(true)
    const [noFiles, setNoFiles] = useState(false)
    useEffect(()=>
    {
        const getFolderData = async () =>
        {
            if (!props.session.user?.email) return
            const data = await fetch("/api/get_filesystem")



            const folder_text = await data.json()

            console.log(folder_text)
            
            const file_data = folder_text.filesys.message.split(" ")
            const new_root = FolderCreator(file_data, props.session.user?.email)
            console.log(new_root)
            if (new_root.children.length == 0)
            {
                setNoFiles(true)
            }
            else{
            setFolder(new_root)
            }
            
            setLoading(false)

        }

        if(props.status === "authenticated") getFolderData().catch(console.error)

    }, [props.session, props.status])

    const [selectedContent, setSelectedContent] = useState<FolderNode>();
    const handleSelect = (item:FolderNode) => {
        if (item.type === 'file') {
          setSelectedContent(item);
        }
      };
    

    if (loading)
    {
        return  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center ">
          <h2 className="text-[6vw] sm:text-[2.5rem]">Loading...</h2>
        </main>
        </div>
    }
    if (!folders)
    {
        return  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center ">
            <h2 className="text-[6vw] sm:text-[2.5rem]">Error Loading files :/</h2>
            </main>
            </div>
    }
    if (noFiles)
        {
            return  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center ">
            <h2 className="text-[6vw] sm:text-[2.5rem]">No files found, start prototyping!</h2>
            </main>
            </div>
        }
    return (
        <div className="grid grid-cols-8 min-h-screen gap-16  font-[family-name:var(--font-geist-sans)] border-t-2 border-gray-300">
            <div className='col-span-3 border-r-2 border-gray-500 overflow-scroll'>
                <FileSystem item={folders} onSelect={handleSelect} email={props.session.user?.email}/>
            </div>
            <div className="col-span-5">
                {(selectedContent) ? 
                <ContentViewer content={selectedContent} />
                :
                 <div className="p-4 text-gray-500">No content selected</div>}
            </div>
        </div>
            
    )
}