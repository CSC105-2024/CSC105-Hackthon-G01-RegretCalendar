import { useState, useEffect } from "react";
import Navbar from "../assets/components/navbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiBook2Fill } from "react-icons/ri";
function HomePage() {
  const [logs, setLog] = useState(null);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [regret,setRegret] = useState("");
  const [showReframe , setShowReframe] = useState(false);
  const [reframe,setReframe] = useState("");
  const [regretReframed , setRegretReframed] = useState(null);
  const handleSubmitReframer = async () => {
    try{
        const data = {
            id : logs.id,
            regret : reframe
        }
        const res = await axios.post(`http://localhost:3001/idea/reframe`,data)  
        setShowReframe(true)
        setRegretReframed(res.data.reframed)
    }
    catch(err){
        console.log(err);
        
    }
  }
  const handleSubmit = async () => {
    console.log(logs.id);

    try {
      if (isEditing) {
        const data = {
          regret: regret
        };
        const res = await axios.patch(`http://localhost:3001/idea/${logs.id}`, data); // PATCH if editing
        console.log(res.data);
        setSaved(!saved)
        
      } else {
        const data = {
          userId: user.id,
          regret: regret
        };
        await axios.post("http://localhost:3001/idea/", data); // POST if new
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/api/profile", {
          withCredentials: true,
        });
        setUser(res.data.user.user);
      } catch (err) {
        console.log(err);
        window.location.href = "/login";
      }
    };
    const fetchTodayLog = async () => {
      try {
        const res = await axios.get("http://localhost:3001/idea/api/today", {
          withCredentials: true,
        });

        if (res.data.idea.regret !== "") {
          setIsEditing(true);
        }
        if (res.data.idea.reframed_regret) {
          setRegretReframed(res.data.idea.reframed_regret);
          setShowReframe(true)
        }

        setLog(res.data.idea);
        setRegret(res.data.idea.regret)
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    fetchTodayLog();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-[#F0F4F5] font-inter pt-52">
      <div className="flex flex-col items-center text-center">
        <RiBook2Fill
          size={70}
          className="mb-10 border-1 rounded-full p-2 text-myPrimary bg-gray-200"
        />
        <h1 className="text-4xl font-bold mb-4 text-[#5E8B7E]">
          Calendar Of Regret
        </h1>
        <p className="text-xl mt-5 mb-6 text-[#6E6E6E]">
          Instead of planning for the future, reflect on your past. Log what{" "}
          <br></br>you wish you hadn’t done, find learnings, and grow.
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-80 mt-15">
          <div className="flex flex-col w-full p-6">
            <h2 className="flex justify-left text-2xl ">Today Reflection</h2>
            <p className="flex justify-left text-md text-[#6E6E6E]">
              What do you wish you hadn’t done today
            </p>
            {saved ? (
              <textarea
                placeholder="Describe the action or inaction you regret from today."
                className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
                value={regret}
                onChange={(e) => setRegret(e.target.value)}
              />
            ) : (
              <textarea
                placeholder="Describe the action or inaction you regret from today."
                className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
                value={regret}
                disabled
              />
            )}

            {saved ? (
              <button
                className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end "
                onClick={handleSubmit}
              >
                Save Log
              </button>
            ) : (
              <button
                className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end "
                onClick={() => setSaved(!saved)}
              >
                Edit Log
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-[#F0F4F5] border -center px-4 py-2 mt-2 rounded-lg shadow-lg hover:bg-[#4A6B5F] self-end hover:text-white">
          View Calendar Log
        </button>
      </div>
      <hr className="h-px my-8 w-1/2 bg-black border-0 mx-auto" />

      <div className="flex justify-center">
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-auto mt-15">
          <div className="flex flex-col w-full p-6">
            <h2 className="flex justify-left text-2xl ">Regret Reframer</h2>
            <p className="flex justify-left text-md text-[#6E6E6E]">
              Transform your regret into valuable learning experience with AI.
            </p>
            <textarea
              placeholder="Describe the action or inaction you regret from today."
              className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
              value={reframe}
              onChange={(e) => setReframe(e.target.value)}
            />
            <button className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end " onClick={handleSubmitReframer}>
              Generate Reflection
            </button>
            {showReframe ? 
            
            <div className="mt-2">
                <h1>Reframed Regret</h1>
                <textarea
              placeholder="Describe the action or inaction you regret from today."
              className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
              value={regretReframed}
              disabled
            />

            </div>
            
            : ""}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10"></div>
    </div>
  );
}
export default HomePage;
