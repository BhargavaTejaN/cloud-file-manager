"use client"

import React, { useContext, useEffect,useState } from 'react'
import {useFireBaseContext} from '../../../customHooks/useFireBaseContext'
import SearchBar from '@/components/SearchBar';
import {ParentFolderIdContext} from '../../../context/ParentFolderId'

const FolderDetails = ({params}) => {
    const {getFolderName} = useFireBaseContext();
    const [folderDetails,setFolderDetails] = useState(null);
    const name = folderDetails? folderDetails.name : "Loading..";
    const FolderName = name + " Folder"
    const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext)

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

  useEffect(() => {
    onGetFolderName();
    setParentFolderId(params.id);
  },[params.id])

  return (
    <div className='p-5'>
      <SearchBar />
      <h2 className='text-[20px] font-bold mt-5'>{FolderName}</h2>
    </div>
  )
}

export default FolderDetails