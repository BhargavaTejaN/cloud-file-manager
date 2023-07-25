"use client";

import Provider from "@/components/Provider";
import "./globals.css";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import SideNavBar from "@/components/SideNavBar";
import { FireBaseProvider } from "../context/FireBase";
import Tost from "@/components/Tost";
import { ShowToastContext } from "../context/ShowTost";
import {ParentFolderIdContext} from '../context/ParentFolderId';


export const metadata = {
  title: "Cloud File Manager",
  description: "A Cloud Based File Manager",
};

export default function RootLayout({ children }) {
  const [showTostMsg, setShowTostMsg] = useState(null);
  const [parentFolderId, setParentFolderId] = useState(null);

  return (
    <html lang="en">
      <body>
        <Provider>
          <FireBaseProvider>
            <ParentFolderIdContext.Provider value={{parentFolderId, setParentFolderId}}>
              <ShowToastContext.Provider
                value={{ showTostMsg, setShowTostMsg }}
              >
                <div className="flex">
                  <SideNavBar />
                  <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                    <div className="col-span-2">{children}</div>
                    <div className="bg-white p-5 order-first md:order-last">
                      Storage
                    </div>
                  </div>
                </div>
                {showTostMsg && <Tost msg={showTostMsg} />}
              </ShowToastContext.Provider>
              </ParentFolderIdContext.Provider>
          </FireBaseProvider>
        </Provider>
      </body>
    </html>
  );
}
