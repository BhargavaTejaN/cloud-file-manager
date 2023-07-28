"use client";

import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
//import { getAnalytics } from "firebase/analytics";

import { createContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-manager-393712.firebaseapp.com",
  projectId: "cloud-file-manager-393712",
  storageBucket: "cloud-file-manager-393712.appspot.com",
  messagingSenderId: "204086373485",
  appId: "1:204086373485:web:234f861bd9ee45946d6364",
  measurementId: "G-4GDSZ5Q97H",
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const FireStore = getFirestore(FireBaseApp);
const FireStoreStorage = getStorage(FireBaseApp);
//const analytics = getAnalytics(app);

export const FireBaseContext = createContext();

export const FireBaseProvider = ({ children }) => {
  const { data: session } = useSession();

  const createNewFolder = async (
    folderName,
    folderPath,
    docId,
    parentFolderId
  ) => {
    const response = await setDoc(doc(FireStore, folderPath, docId), {
      name: folderName,
      id: docId,
      createdBy: session?.user?.email,
      parentFolderId: parentFolderId,
    });
    return createNewFolder;
  };

  const getFoldersList = async (filePath,parentFolderId) => {
    const newQuery = query(
      collection(FireStore, filePath),
      where("parentFolderId", "==",parentFolderId),
      where("createdBy", "==", session.user.email)
    );
    const querySnapShot = await getDocs(newQuery);
    return querySnapShot;
  };

  const getFolderName = async (folderId) => {
    const docRef = doc(FireStore, "Folders", folderId);
    const result = await getDoc(docRef);
    if (result.exists()) {
      return result;
    }
  };

  const getSubFoldersList = async (folderPath,id) => {
    const newQuery = query(
      collection(FireStore, folderPath),
      where("createdBy", "==", session.user.email),
      where("parentFolderId", "==", id)
    );
    const querySnapShot = await getDocs(newQuery);
    return querySnapShot;
  };

  const getFilesList = async(filepath,parentFolderId) => {
    const newQuery = query(collection(FireStore,filepath),where("parentFolderId", "==",parentFolderId),where("createdBy","==",session?.user?.email));
    const querySnapShot = await getDocs(newQuery);
    return querySnapShot
  }

  const uploadFile = async (file, filesPath, docId, parentFolderId) => {
    const fileRef = ref(FireStoreStorage, "files/" + file.name);
  
    try {
      const snapshot = await uploadBytes(fileRef, file);
      console.log("Uploaded a file!");
  
      const downloadURL = await getDownloadURL(fileRef);
      console.log("File url : ", downloadURL);
  
      const response = await setDoc(doc(FireStore, filesPath, docId), {
        id : docId,
        name: file.name,
        type: file.name.split(".")[1],
        size: file.size,
        modifiedAt: file.lastModified,
        createdBy: session?.user?.email,
        parentFolderId: parentFolderId,
        imageUrl: downloadURL,
      });
  
      return response; // Return the response object if needed in other functions
    } catch (error) {
      console.error("Error uploading the file:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const deleteFile = async(filepath,fileId) =>{
    const response = await deleteDoc(doc(FireStore, filepath,fileId.toString()));
    //console.log(filepath,fileId)
    return response
  }

  const deleteFolder = async(folderPath,folderId) => {
    const response = await deleteDoc(doc(FireStore,folderPath,folderId));
    return response;
  }

  const getAllFiles = async(filePath) => {
    const newQuery = query(collection(FireStore,filePath),where("createdBy","==",session?.user?.email));
    const QuerySnapShot = await getDocs(newQuery);
    return QuerySnapShot;
  }
  

  const value = {
    FireBaseApp,
    FireStore,
    createNewFolder,
    getFoldersList,
    getFolderName,
    getSubFoldersList,
    getFilesList,
    uploadFile,
    deleteFile,
    deleteFolder,
    getAllFiles
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
};
