"use client"

import React, { useEffect,useContext } from "react";
import { ShowToastContext } from "@/context/ShowTost";

const Tost = ({msg}) => {
  const {showTostMsg, setShowTostMsg} = useContext(ShowToastContext);

  useEffect(() => {
    setInterval(() => setShowTostMsg(null),3000);
  },[showTostMsg])

  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{msg}</span>
      </div>
    </div>
  );
};

export default Tost;
