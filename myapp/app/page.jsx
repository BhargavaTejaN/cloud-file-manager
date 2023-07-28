"use client"

import { useEffect, useState,useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

import SearchBar from "@/components/SearchBar";
import FolderList from "@/components/Folder/FolderList";
import FileList from "@/components/File/FileList";

import {ParentFolderIdContext} from '../context/ParentFolderId'

export default function Home() {

  const {data : session} = useSession();
  const router = useRouter();

  const [folderList,setFolderList] = useState([]);
  const [fileList,setFileList] = useState([]);

  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext)

  const checkSession = () => {
    if(!session){
      router.push("/login")
    }
    setParentFolderId(0)
  }

  useEffect(() => {
    checkSession();
  },[session])

  const handleFilteredData = (filteredFolders, filteredFiles) => {
    setFolderList(filteredFolders)
    setFileList(filteredFiles)
  }

  // console.log("FolderList in SEARCHBAR : ",folderList);
  // console.log("FileList in SEARCHBAR : ",fileList);

  const params = {
    id : undefined
  }

  return (
    <div className="p-5">
      <SearchBar onReceiveFilteredData={handleFilteredData} params={params} />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList}/>
    </div>
  )
}
