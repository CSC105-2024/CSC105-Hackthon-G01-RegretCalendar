import { useState,useEffect } from 'react'
import Navbar from '../assets/components/navbar.jsx'
import { Link } from 'react-router-dom'
import axios from 'axios'
function HomePage() {
    return (
        <div className="bg-[#F0F4F5] font-inter pt-76">   
            <div className="flex flex-col items-center text-center">
                <h1 className="text-4xl font-bold mb-4 text-[#5E8B7E]">Calendar Of Regret</h1>
                <p className="text-xl mt-5 mb-6 text-[#6E6E6E]">Instead of planning for the future, reflect on your past. Log what <br></br>you wish you hadn’t done, find learnings, and grow.</p>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-80 mt-15">
                    <div className="flex flex-col w-full p-6">
                        <h2 className="flex justify-left text-2xl ">Today Reflection</h2>
                        <p className="flex justify-left text-md text-[#6E6E6E]">What do you wish you hadn’t done today</p>
                        <textarea
                            placeholder="Describe the action or inaction you regret from today."
                            className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
                        />
                        <button className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end ">
                            Save Log
                        </button>
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
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg w-1/2  h-80 mt-15">
                    <div className="flex flex-col w-full p-6">
                        <h2 className="flex justify-left text-2xl ">Regret Reframer</h2>
                        <p className="flex justify-left text-md text-[#6E6E6E]">Transform your regret into valuable learning experience with AI.</p>
                        <textarea
                            placeholder="Describe the action or inaction you regret from today."
                            className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
                        />
                        <button className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end ">
                            Generate Reflection
                        </button>
                    </div>
                </div>
            </div>
             <div className="flex justify-center mt-10">
            </div>
        </div>
       
    )
}
export default HomePage