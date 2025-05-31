import { FaPeopleGroup } from "react-icons/fa6";
import socket from "../socket/socket"
import {useState,useEffect} from "react"
function CommunityPage() {
  useEffect(() => {
    
    

  },[])
  return (
    <div className="bg-[#F0F4F5] min-h-screen font-inter pt-50">
      <div className="flex justify-center mt-8">
        <FaPeopleGroup size={44} />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#5E8B7E] mb-4">
          Community Reflection
        </h1>
        <p className="text-lg text-[#6E6E6E]">
          Share your reflections anonymously and learn from the experiences
          <br></br> of others. This is a space for collective growth and
          understanding.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-80 mt-15">
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
            />
            <button className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end ">
              Share as Anonymous
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-bold text-[#5E8B7E] mb-4">
          Shared by Reflection
        </h1>
        <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-80 mt-15"></div>
      </div>
      <div className="flex justify-center mt-10"></div>
    </div>
  );
}

export default CommunityPage;
