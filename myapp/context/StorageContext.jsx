import React,{createContext,useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';
import StorageSize from '@/Services/StorageSize';
import CountOfTypeOfFiles from '@/Services/CountOfTypeOfFiles';
import {useFireBaseContext} from '@/customHooks/useFireBaseContext'

export const StorageContext = createContext(null);

const h = "hello"

const imageTypes = ['jpg', 'png', 'jpeg'];
const videoTypes = ['mp4','mkv'];
const documentTypes = ['pdf', 'doc', 'docx', 'xlsx','xlsm','xlsb','xltx','xls'];


export const StorageProvider = ({children}) => {
    const {data : session} = useSession();
    const {getAllFiles} = useFireBaseContext();

    const [totalSizeUsed, setTotalSizeUsed] = useState(0);
    const [imageSize,setImageSize]=useState(0);
    const [pdfSize,setPdfSize] = useState(0);
    const [docSize,setDocSize] = useState(0);
    const [excelSize,setExcelSize] = useState(0);
    const [videoSize,setVideoSize] = useState(0);
    const [fileList,setFileList]=useState([]);
    const [imageFilesState,setImageFilesState] = useState(0);
    const [videoFilesState,setVideoFilesState] = useState(0);
    const [documentFilesState,setDocumentFilesState] = useState(0);
    let totalSize=0;

    const storageList = [
        {
          id: 1,
          type: "Images",
          totalFile: imageFilesState,
          size: imageSize + " MB",
          logo:'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
        },
        {
          id: 2,
          type: "Videos",
          totalFile: videoFilesState,
          size: videoSize + " MB",
          logo:'M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
      
        },
        {
          id: 3,
          type: "Documents",
          totalFile: documentFilesState,
          size: `${(parseFloat(pdfSize) + parseFloat(docSize) + parseFloat(excelSize)).toFixed(2)} MB`,
          logo:'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z'
      
        },
        {
          id: 4,
          type: "Others",
          totalFile: "0",
          size: "0 MB",
          logo:'M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
      
        },
    ];

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
        setImageSize(StorageSize.getStorageByType(fileList,imageTypes));
        setPdfSize(StorageSize.getStorageByType(fileList,['pdf']));
        setDocSize(StorageSize.getStorageByType(fileList,['docx', 'doc']));
        setExcelSize(StorageSize.getStorageByType(fileList,['xlsx','xlsm','xlsb','xltx','xls']));
        setVideoSize(StorageSize.getStorageByType(fileList,videoTypes));
      },[fileList]);
    
      useEffect(() => {
        setImageFilesState(CountOfTypeOfFiles.getNoOfFilesByType(fileList, imageTypes));
        setVideoFilesState(CountOfTypeOfFiles.getNoOfFilesByType(fileList, videoTypes));
        setDocumentFilesState(CountOfTypeOfFiles.getNoOfFilesByType(fileList, documentTypes));
      },[fileList])

  // console.log("imageSize : ",imageSize);
  // console.log("pdfSize : ",pdfSize);
  // console.log("docSize : ",docSize);
  // console.log("excelSize : ",excelSize);
  // console.log("videoSize : ",videoSize);

  // console.log("imageFilesState : ",imageFilesState);
  // console.log("videoFilesState : ",videoFilesState);
  // console.log("documentFilesState : ",documentFilesState);

    const value = {
        storageList
    }

    return(
        <StorageContext.Provider value={value}>
            {children}
        </StorageContext.Provider>
    )
}