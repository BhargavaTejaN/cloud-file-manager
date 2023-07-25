"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";

const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session){
            router.push("/")
        }
    },[session])

  return (
    <div className="flex justify-center items-center mt-[25%] ml-[0%] md:ml-[50%] flex-col gap-6">
      <button className=" text-white" onClick={() => signIn()}>
        <Image src="/google.png" alt="google" width={300} height={300} />
      </button>
    </div>
  );
};

export default Login;
