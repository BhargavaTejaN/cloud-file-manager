"use client";

import React, { useState,useContext } from "react";
import Image from "next/image";
import { doc,setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

import {useFireBaseContext} from '../../customHooks/useFireBaseContext'
import { ShowToastContext } from "@/context/ShowTost";
import {ParentFolderIdContext} from '../../context/ParentFolderId'

const CreateFolderModel = () => {
  const {createNewFolder} = useFireBaseContext();
  const {data : session} = useSession();
  const {showTostMsg, setShowTostMsg} = useContext(ShowToastContext);
  const {parentFolderId, setParentFolderId} = useContext(ParentFolderIdContext)

  const [folderName, setFolderName] = useState();
  const docId = Date.now().toString()

  const onCreate = async() => {
    try {
      const result = await createNewFolder(folderName,"Folders",docId,parentFolderId)
      setShowTostMsg("Folder Created");
    } catch (error) {
      console.log("ERROR WHILE CREATING A NEW FOLDER : ",error)
    }
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
            onChange={(e) => setFolderName(e.target.value)}
          />
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={() => onCreate()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderModel;
