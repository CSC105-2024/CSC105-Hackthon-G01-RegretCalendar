import { useState } from 'react'
import Navbar from '../assets/components/navbar.jsx'
import { Link } from 'react-router-dom'
import { FiBook } from "react-icons/fi";


function HomePage() {
    return (
        <div className="bg-[#F0F4F5] font-inter">
            <Navbar />
            <div className='flex justify-center mt-8 text-[#5E8B7E]'>
            <FiBook size={46}/>
            </div>
            <div className="flex flex-col items-center text-center mt-5">
                
                <h1 className=" text-4xl font-bold mb-4 text-[#5E8B7E]">Calendar Of Regret</h1>
                <p className="md:text-xl text-lg mt-5 mb-6 text-[#6E6E6E]">Instead of planning for the future, reflect on your past. Log what you wish you hadn’t done, find learnings, and grow.</p>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg md:w-1/2  h-80 w-90 mt-15">
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
                <button className="bg-[#F0F4F5] border -center px-4 py-2 mt-2 rounded-lg shadow-lg hover:bg-[#4A6B5F] self-end">
                    View Calendar Log
                </button>
            </div>

            <hr className="h-px my-8 w-full md:w-1/2 bg-black border-0 mx-auto" />

            <div className="flex justify-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg md:w-1/2  h-80 w-90 mt-15">
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