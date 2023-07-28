"use client"

import React, { useState,useEffect, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {useFireBaseContext} from '@/customHooks/useFireBaseContext';
import {ParentFolderIdContext} from "@/context/ParentFolderId"

const filteredResults = (folderList,fileList,searchInput) => {
  const filteredFolders = folderList.filter((each) => each.name.toLowerCase().includes(searchInput.toLowerCase()));
  const filteredFiles = fileList.filter((each) => each.name.toLowerCase().includes(searchInput.toLowerCase()));
  return { filteredFolders, filteredFiles };
}

const SearchBar = ({onReceiveFilteredData,params}) => {

  const router = useRouter();
  const {data : session} = useSession();
  const {getFoldersList,getFilesList} = useFireBaseContext();
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext);

  const [folderList,setFolderList] = useState([]);
  const [fileList,setFileList] = useState([]);
  const [searchInput,setSearchInput] = useState('');

  let ID;

  if(params.id === undefined){
    ID = parentFolderId
  } else {
    ID = params.id
  }

  const onGetFoldersList = async() => {
    try {
      setFolderList([]);
      const response = await getFoldersList("Folders",ID);
      setFolderList(response.docs.map(doc => doc.data()));
    } catch (error) {
      console.log("ERROR WHILE FETCHING FOLDERS IN SEARCHBAR COMPONENT : ",error)
    }
  }

  const onGetFilesList = async() => {
    try {
      setFileList([]);
      const response = await getFilesList("Files",parentFolderId);
      setFileList(response.docs.map(doc => doc.data()));
    } catch (error) {
      console.log("ERROR WHILE FETCHING FILES IN SEARCHBAR COMPONENT : ",error)
    }
  }

  useEffect(() => {
    if(session){
      onGetFoldersList();
      onGetFilesList();
    }
  },[session])

  const filteredData = useMemo(() => {
    return filteredResults(folderList, fileList, searchInput);
  }, [folderList, fileList, searchInput]);

  useEffect(() => {
    onReceiveFilteredData(filteredData.filteredFolders, filteredData.filteredFiles);
  },[filteredData, onReceiveFilteredData]);

  // console.log("FolderList in SEARCHBAR : ",folderList);
  // console.log("FileList in SEARCHBAR : ",fileList);


  return (
    <div>
      <div
        className="flex gap-3 bg-white
    p-2 rounded-lg items-center w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={(event) => setSearchInput(event.target.value)}
          className="bg-transparent
       outline-none w-full text-[14px
       text-black"
        />
      </div>
    </div>
  );
};

export default SearchBar;
