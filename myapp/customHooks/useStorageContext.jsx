import { useContext } from "react";
import {StorageContext} from '@/context/StorageContext'

export const useStorageContext = () => {
    const context = useContext(StorageContext);

    if(!context){
        throw Error("useStorageContext must be within StorageProvider")
    }

    return context
}