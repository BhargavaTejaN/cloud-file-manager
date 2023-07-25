"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, query, where,doc, getDoc} from 'firebase/firestore'
import { useSession } from "next-auth/react";
//import { getAnalytics } from "firebase/analytics";

import {createContext, useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-manager-393712.firebaseapp.com",
  projectId: "cloud-file-manager-393712",
  storageBucket: "cloud-file-manager-393712.appspot.com",
  messagingSenderId: "204086373485",
  appId: "1:204086373485:web:234f861bd9ee45946d6364",
  measurementId: "G-4GDSZ5Q97H"
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const FireStore = getFirestore(FireBaseApp);
//const analytics = getAnalytics(app);

export const FireBaseContext = createContext();

export const FireBaseProvider = ({children}) => {

    const {data : session} = useSession();


    const getFoldersList = async() => {
        const newQuery = query(collection(FireStore,"Folders"),where("createdBy", "==", session.user.email));
        const querySnapShot = await getDocs(newQuery);
        return querySnapShot
    }

    const getFolderName = async(folderId) => {
        const docRef = doc(FireStore,"Folders",folderId);
        const result = await getDoc(docRef)
        if(result.exists()){
            return result
        }
    }

    const value = {
        FireBaseApp,FireStore,getFoldersList,getFolderName
    }

    return(
        <FireBaseContext.Provider value={value}>
            {children}
        </FireBaseContext.Provider>
    )
}
