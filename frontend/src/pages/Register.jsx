import React from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("asd");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const data = {
      email: email,
      username: username,
      password: password,
    };
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address. (Must contains @)");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one letter and one number."
      );
      return;
    }
    try {
      const res = await axios.post("http://localhost:3001/user", data);
      console.log(res.data);
      window.location.href = "/login"
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-myBg flex justify-center items-center px-2">
      <div className="w-full max-w-md bg-myWhite flex flex-col items-center rounded-2xl shadow-2xl bg-white">
        <div className="space-y-4 w-full px-6 py-10">
          <h1 className="text-3xl text-center">Sign Up</h1>
          <div>
            <p>Email</p>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p>Username</p>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <p>Password</p>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full text-white bg-myPrimary rounded-xl py-2 mt-10 duration-300 hover:bg-myPrimaryHover"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <p className="flex justify-center text-sm">
            Already have an account?
            <span
              className="mx-1 text-myPrimary cursor-pointer duration-300 hover:text-myPrimaryHover hover:underline"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
