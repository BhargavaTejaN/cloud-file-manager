"use client";

import React, { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

import { useFireBaseContext } from "../../customHooks/useFireBaseContext";
import {useStorageContext} from '@/customHooks/useStorageContext'

const StorageInfo = () => {
    const {data : session} = useSession();
  const { getAllFiles } = useFireBaseContext();
  const {storageList} = useStorageContext();

  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  const [fileList,setFileList]=useState([]);

  const [imagePercentage, setImagePercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [documentPercentage, setDocumentPercentage] = useState(0);
  const [othersPercentage, setOthersPercentage] = useState(0);

  let totalSize=0;

  const onGetAllFiles = async() => {
    try {
        const response = await getAllFiles("Files");
        const totalSize = response.docs.reduce((acc,doc) => acc + doc.data()['size'],0)
        setFileList(response.docs.map(doc => doc.data()));
        setTotalSizeUsed((totalSize / (1024 ** 2)).toFixed(2) + " MB");
    } catch (error) {
        console.log("ERROR WHILE FETCHING ALL FILES : ",error)
    }
  }
  
  useEffect(() => {
    if(session){
        totalSize=0;
        onGetAllFiles();
    }
  },[session])

  useEffect(() => {
    if (storageList.length === 4) {
      const imageCategorySize = parseFloat(storageList[0].size.split(" ")[0]);
      const videoCategorySize = parseFloat(storageList[1].size.split(" ")[0]);
      const documentCategorySize = parseFloat(storageList[2].size.split(" ")[0]);
      const othersCategorySize = parseFloat(storageList[3].size.split(" ")[0]);
      const totalUsedStorage = imageCategorySize + videoCategorySize + documentCategorySize + othersCategorySize;

      setImagePercentage((imageCategorySize / totalUsedStorage) * 100);
      setVideoPercentage((videoCategorySize / totalUsedStorage) * 100);
      setDocumentPercentage((documentCategorySize / totalUsedStorage) * 100);
      setOthersPercentage((othersCategorySize / totalUsedStorage) * 100);
    }
  }, [storageList]);

  // console.log("storageList : ",storageList);

  return (
    <div className="mt-7">
      <h2 className="text-[22px] font-bold">
        {" "}
        {totalSizeUsed}{" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>

      <div className="w-full bg-gray-200 h-2.5 flex">
        <div style={{ width: `${imagePercentage}%` }} className="bg-green-600 h-2.5"></div>
        <div style={{ width: `${videoPercentage}%` }} className="bg-blue-600 h-2.5"></div>
        <div style={{ width: `${documentPercentage}%` }} className="bg-yellow-400 h-2.5"></div>
        <div style={{ width: `${othersPercentage}%` }} className="bg-red-400 h-2.5"></div>
      </div>
    </div>
  );
};


export default StorageInfo;
