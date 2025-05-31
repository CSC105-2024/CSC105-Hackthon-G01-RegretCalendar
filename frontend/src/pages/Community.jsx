import { FaPeopleGroup } from "react-icons/fa6";
import socket from "../socket/socket";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MdEdit, MdDeleteOutline } from "react-icons/md";
import axios from "axios";
function CommunityPage() {
  const [echoes, setEchoes] = useState([]);
  const [reflect, setReflect] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const sendEcho = async () => {
    socket.emit("echo", { message: reflect });
    setReflect("");
  };

  const handleDeleteLog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/dailyLog/${id}`)
      console.log(res.data);
      setEchoes((prev) => prev.filter((item) => item.id !== id)); 
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    socket.connect();
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/api/profile", {
          withCredentials: true,
        });
        setCurrentUser(res.data.user.user);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchDailyLog = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/dailyLog`, {
          withCredentials: true,
        });
        console.log(res.data.todayLog);
        setEchoes(res.data.todayLog);
      } catch (err) {
        console.error(err);
      }
    };
    socket.on("connection", () => {
      console.log("connected to server");
    });
    socket.on("receiveMessage", (data) => {
      console.log("New message:", data);

      setEchoes((prev) => [...prev, data.echo]);
    });
    fetchCurrentUser();
    fetchDailyLog();

    return () => {
      socket.off("receiveMessage");
      socket.off("chatHistory");
      socket.disconnect();
    };
  }, []);
  if(!currentUser) return <>Loading..</>
  return (
    <div className="bg-[#F0F4F5] min-h-screen font-inter pt-40">
      <div className="flex justify-center">
        <FaPeopleGroup size={44} />
      </div>

      <div className="flex flex-col items-center mt-5 w-full">
        <h1 className="text-4xl text-center font-bold text-[#5E8B7E] mb-4">
          Community Reflection
        </h1>
        <p className="text-lg text-center text-[#6E6E6E]">
          Share your reflections anonymously and learn from the experiences
          <br /> of others. This is a space for collective growth and
          understanding.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg  md:w-1/2  h-80 w-90  mt-15">
          <div className="flex flex-col w-full p-6">
            <h2 className="flex text-[#5E8B7E] font-bold justify-left text-2xl ">
              Share Your Reflection
            </h2>
            <p className="flex justify-left text-md text-[#6E6E6E]">
              Write down a regret or a learning experience you'd like to share
              anonymously.
            </p>
            <textarea
              placeholder="Describe the action or inaction you regret from today."
              className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
              value={reflect}
              onChange={(e) => setReflect(e.target.value)}
            />
            <button
              className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end "
              onClick={sendEcho}
            >
              Share as Anonymous
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold text-[#5E8B7E] mb-4">
          Shared by Reflection
        </h1>
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2 min-h-20 max-h-80 mt-15 flex-col overflow-auto space-y-1">
          {echoes?.map((value) => {
            const iso = value.createdAt;
            const date = new Date(iso);
            const time = date.toLocaleTimeString("en-CA", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Singapore",
            });
            

            return (
              <div key={value.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="flex relative group">
                      <span className="font-bold">
                        Anonymouse{" "}
                        {currentUser.id === value.userId ? (
                          <span className="text-red-500">(You)</span>
                        ) : (
                          ""
                        )}{" "}
                        said:{" "}
                      </span>
                      {value.reflection}
                       {currentUser.id === value.userId ? <div className="duration-300 text-sm px-2 space-x-1 hidden group-hover:flex ">
                        <MdDeleteOutline className="cursor-pointer  text-gray-400" onClick={() => handleDeleteLog(value.id)}/>
                      </div> : ""}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>{time}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-10"></div>
    </div>
  );
}

export default CommunityPage;
