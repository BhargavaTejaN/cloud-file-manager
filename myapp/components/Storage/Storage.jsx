import React from "react";
import UserInfo from "./UserInfo";
import StorageInfo from "./StorageInfo";
import StorageDetailList from "./StorageDetailList";
import StorageUpgradeMsg from "./StorageUpgradeMsg";
import { useSession } from "next-auth/react";

const Storage = () => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <>
          <UserInfo />
          <StorageInfo />
          <StorageDetailList />
          <StorageUpgradeMsg />
        </>
      ) : (
        <h1>Please Login</h1>
      )}
    </div>
  );
};

export default Storage;
