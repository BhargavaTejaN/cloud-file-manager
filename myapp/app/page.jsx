"use client"

import { useEffect, useState,useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";

import {useFireBaseContext} from '../customHooks/useFireBaseContext'
import {ParentFolderIdContext} from '../context/ParentFolderId'

export default function Home() {

  const {data : session} = useSession();
  const router = useRouter();
  const {getFoldersList} = useFireBaseContext();

  const [folderList,setFolderList] = useState([]);

  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext)

  const getFolderList = async() => {
    try {
      // setFolderList([]);
      const response = await getFoldersList();
      setFolderList(response.docs.map(doc => doc.data()));
    } catch (error) {
      console.log("ERROR WHILE FETCHING THE FOLDERS : ",error)
    }
  }

  const checkSession = () => {
    if(!session){
      router.push("/login")
    }
    else{
      getFolderList();
    }
    setParentFolderId(0)
  }

  useEffect(() => {
    checkSession();
  },[session])

  return (
    <div className="p-5">
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList />
    </div>
  )
}
