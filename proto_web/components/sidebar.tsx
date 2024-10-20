
import React from 'react';
import {useSession, signIn, signOut} from 'next-auth/react';

interface FolderNode {
    name: string;
    type: string;
    children: FolderNode[];
}

interface SidebarProps {
    folders: FolderNode[];
}

export default function Sidebar(props: SidebarProps) 
{
    
}