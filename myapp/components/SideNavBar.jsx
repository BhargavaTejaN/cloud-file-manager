"use client";

import menu from "@/data/menu";
import Image from "next/image";
import React, { useState } from "react";
import CreateFolderModel from "./Folder/CreateFolderModel";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="w-[250px]
    bg-white h-screen sticky top-0
    z-10 shadow-blue-200 shadow-md
    p-5"
    >
      <div className="flex justify-center">
        <Image src="/logo.png" alt="logo" width={150} height={60} />
      </div>
      <button onClick={() => window.my_modal_3.showModal()} className="text-[15px] flex gap-2 items-center bg-green-500 p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center">
        Add New File
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button onClick={() => window.my_modal_3.showModal()} className="flex gap-2 items-center bg-sky-400 p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-2 w-full justify-center">
        New Folder
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <div>
        {menu.list.map((item, index) => (
          <h2
            key={index}
            onClick={() => onMenuClick(item, index)}
            className={`flex gap-2 items-center
          p-2 mt-3 text-gray-500 rounded-md cursor-pointer
          hover:bg-pink-500 hover:text-white ${
            activeIndex === index ? "bg-orange-500 text-white" : null
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>
            {item.name}
          </h2>
        ))}
      </div>
      <dialog id="my_modal_3" className="modal">
        <CreateFolderModel />
      </dialog>
    </div>
  );
};

export default SideNavBar;
