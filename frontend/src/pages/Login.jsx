import React from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
function Login() {
  return (
    <div className="w-full h-screen bg-myBg flex justify-center items-center">
      <div className="w-2xl h-auto   bg-myWhite flex flex-col items-center rounded-2xl shadow-2xl ">
        <div className="space-y-4 w-md py-10">
          <h1 className="text-3xl text-center">Sign In</h1>
          <div>
            <p>Email</p>
            <Input type={"email"} placeholder={"Email"}  className={"text-2xl -h"}/>
          </div>
          
          <div>
            <p>Password</p>
            <Input type={"password"} placeholder={"Password"} />
          </div>
          <button className="w-full text-white bg-myPrimary rounded-xl py-2 mt-14 duration-300 hover:bg-myPrimaryHover  ">Sign In</button>
          <p className="flex justify-center ">Don't have an account yet?  <span className="mx-1 text-myPrimary cursor-pointer duration-300 hover:text-myPrimaryHover hover:underline" onClick={() => window.location.href = "/register"}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
