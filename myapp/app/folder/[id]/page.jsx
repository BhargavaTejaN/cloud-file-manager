"use client"

import React, { useContext, useEffect,useState } from 'react'
import {useRouter} from 'next/navigation';
import {useFireBaseContext} from '../../../customHooks/useFireBaseContext'
import SearchBar from '@/components/SearchBar';
import {ParentFolderIdContext} from '../../../context/ParentFolderId'
import {ShowToastContext} from '../../../context/ShowTost'
import { useSession } from 'next-auth/react';
import FolderList from '@/components/Folder/FolderList';
import FileList from '@/components/File/FileList';

const FolderDetails = ({params}) => {
    const {data : session} = useSession();
    const router = useRouter();

    const {getFolderName,getSubFoldersList,getFilesList,deleteFolder} = useFireBaseContext();
    const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);
    const {showTostMsg, setShowTostMsg} = useContext(ShowToastContext);

    const [folderDetails,setFolderDetails] = useState(null);
    const [folderList,setFolderList] = useState([]);
    const [fileList,setFileList] = useState([]);
    const name = folderDetails? folderDetails.name : "Loading..";
    const FolderName = name + " Folder"

    const onGetFolderName = async() => {
      try {
        const response = await getFolderName(params.id);
        if(response){
          const data = await response.data();
          setFolderDetails(data);
        }
      } catch (error) {
        console.log("ERROR WHILEE FETCHING THE FILE NAME FROM FIREBASE FIRESTORE : ",error)
      }
    }

    const onDeleteFolder = async(folderId) => {
      try {
        const response = await deleteFolder("Folders",folderId);
        setShowTostMsg('Folder Deleted !');
        router.push("/");

      } catch (error) {
        console.log("ERROR WHILE DELETING THE FOLDER : ",error)
      }
    } 

    const handleFilteredData = (filteredFolders, filteredFiles) => {
      setFolderList(filteredFolders)
      setFileList(filteredFiles)
    }

  useEffect(() => {
    onGetFolderName();
    setParentFolderId(params.id);
    if(session ||showTostMsg!=null){
      setFolderList([]);
      setFileList([]);
    }
  },[params.id,showTostMsg,session])

  return (
    <div className='p-5'>
      <SearchBar params={params} onReceiveFilteredData={handleFilteredData} />
      <div className='flex justify-between'>
      <h2 className='text-[20px] font-bold mt-5'>{FolderName}</h2>
      <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>onDeleteFolder(params.id)}
          fill="none" viewBox="0 0 24 24" 
          strokeWidth={1.5} stroke="currentColor"
           className="w-5 cursor-pointer pt-5 mr-5 float-right text-red-500 
           hover:scale-110 transition-all">
       <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  )
}

export default FolderDetails