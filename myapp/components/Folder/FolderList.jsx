"use client"

import React,{useState} from "react";
import { useRouter } from "next/navigation";
import FolderItem from "./FolderItem";


const FolderList = ({folderList}) => {
  const [activeFolder, setActiveFolder] = useState();
  const router = useRouter();

  const onFolderClick = (folder,index) => {
    setActiveFolder(index);
    // router.push("/folder/"+folder.id)
    //router.push("/folder"+folder.id`?name=folder.name`)
    router.push(/folder/ +folder.id+`?name=${folder.name}`)
  }

  return (
    <div className="p-5 mt-5 bg-white rounded-lg">
      <h2 className="text-[17px] font-bold items-center">
        Recent Folders
        <span className="cursor-pointer hover:scale-105 transition-all float-right text-blue-400 font-normal text-[13px]">
          View All
        </span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-3 gap-4">
        {folderList.map((eachFolder,index) => (
            <div onClick={() => onFolderClick(eachFolder,index)}>
              <FolderItem details={eachFolder} key={eachFolder} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
