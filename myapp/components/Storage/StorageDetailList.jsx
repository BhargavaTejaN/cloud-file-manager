"use client"

import React from 'react'
import {useStorageContext} from '@/customHooks/useStorageContext'

import StorageDetailItem from './StorageDetailItem';

const StorageDetailList = () => {

  const {storageList} = useStorageContext();

  return (
    <>
    {storageList.map((item,index)=>(
     <StorageDetailItem item={item} key={index} />
    ))}
    </>
  )
}

export default StorageDetailList