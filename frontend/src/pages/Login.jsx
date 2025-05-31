import React,{useState} from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";


function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit  = async () => {
    const data = {
      email : email,
      password : password
    }
    try{
      const res = await axios.post("http://localhost:3001/user/api/login",data,{withCredentials: true})
      console.log(res.data);
      localStorage.setItem('token',res.data.token)
      window.location.href = "/"
      
    }catch(err){
      console.log(err);
      
    }
  }
  return (
    <div className="min-h-screen bg-myBg flex justify-center items-center px-2">
  <div className="w-full max-w-md bg-myWhite flex flex-col items-center rounded-2xl shadow-2xl bg-white">
    <div className="space-y-4 w-full px-6 py-10">
      <h1 className="text-3xl text-center">Sign In</h1>
      <div>
        <p>Email</p>
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <p>Password</p>
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="w-full text-white bg-myPrimary rounded-xl py-2 mt-10 duration-300 hover:bg-myPrimaryHover" onClick={handleSubmit}>
        Sign In
      </button>
      <p className="flex justify-center text-sm">
        Don't have an account yet?
        <span className="mx-1 text-myPrimary cursor-pointer duration-300 hover:text-myPrimaryHover hover:underline" onClick={() => window.location.href = "/register"}>
          Sign Up
        </span>
      </p>
    </div>
  </div>
</div>
  );
}

export default Login;
