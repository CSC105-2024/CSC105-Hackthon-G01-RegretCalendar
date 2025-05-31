import { useState, useEffect } from "react";
import Navbar from "../assets/components/navbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiBook2Fill } from "react-icons/ri";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";


function HomePage() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [logs, setLog] = useState(null);
    const [user, setUser] = useState(null);
    const [saved, setSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [regret, setRegret] = useState("");
    const [showReframe, setShowReframe] = useState(false);
    const [reframe, setReframe] = useState("");
    const [regretReframed, setRegretReframed] = useState(null);
    const handleSubmitReframer = async () => {
        try {
            const data = {
                id: logs.id,
                regret: reframe
            }
            const res = await axios.post(`http://localhost:3001/idea/reframe`, data)
            setShowReframe(true)
            setRegretReframed(res.data.reframed)
        }
        catch (err) {
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
                // window.location.href = "/login"; // Remove or comment out this line
                setUser({ id: 1, name: "Guest" }); // Optionally set a dummy user
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

        <div className="bg-[#F0F4F5] font-inter pt-40">
            <div className="flex flex-col items-center text-center">
                <RiBook2Fill
                    size={70}
                    className="mb-10 border-1 rounded-full p-2 text-myPrimary bg-gray-200"
                />
                <h1 className="text-4xl font-bold mb-4 text-[#5E8B7E]">
                    Calendar of Regret
                </h1>
                <p className="text-xl mt-5 mb-6 text-[#6E6E6E]">
                    Instead of planning for the future, reflect on your past. Log what{" "}
                    <br></br>you wish you hadn’t done, find learnings, and grow.
                </p>
            </div>
            <div className="flex justify-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg  md:w-1/2  h-80 w-90  mt-15">
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

                <button
                    className="bg-[#F0F4F5] border-center px-4 py-2 mt-2 rounded-lg shadow-lg hover:bg-[#4A6B5F] self-end hover:text-white" onClick={() => setShowCalendar(!showCalendar)}>
                    View Calendar Log</button>
                {showCalendar && (
                    <div className="fixed top-0 left-0 w-full h-full md:top-20 md:left-90 md:w-200 md:h-150 flex items-center justify-center bg-white overflow-auto">
                        <button
                            className="absolute top-4 right-4 text-4xl text-black"
                            onClick={() => setShowCalendar(false)}
                            aria-label="Close"
                        >
                            &times;
                        </button>
                        <div className="mt-8 w-full max-w-xs lg:max-w-4xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
                            {/* Calendar Card */}
                            <div className="bg-white p-4 rounded-xl shadow-lg w-full lg:w-[350px] mb-6 lg:mb-0 border border-gray-300">
                                <h2 className="text-2xl font-bold mb-1 text-center lg:text-left">Calendar Of Regrets</h2>
                                <p className="text-sm text-gray-500 mb-4 text-center lg:text-left">
                                    Select a date to view your reflection.<br />Date with logs
                                </p>
                                <h3 className="text-md font-semibold mb-2">Select date</h3>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={(date) => setSelectedDate(date)}
                                />
                            </div>
                            {/* Reflection Card */}
                            <div className="w-full lg:w-[350px]">
                                <h4 className="font-bold text-lg mb-2">
                                    Reflection for:{' '}
                                    {selectedDate
                                        ? selectedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                                        : "No date selected"}
                                </h4>
                                <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
                                    <span className="font-semibold">Your Regret:</span>
                                    <p className="mt-2 text-gray-800">
                                        {logs && logs.regret
                                            ? logs.regret
                                            : "No regret logged for this date."}
                                    </p>
                                    <button className="flex items-center text-green-700 font-semibold mt-4 hover:underline">
                                        <span className="mr-2">➕</span> Reframe this regret</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </div>

            <hr className="h-px my-8 w-1/2 bg-black border-0 mx-auto" />

            <div className="flex justify-center">
                <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg  md:w-1/2  h-80 w-90  mt-15">
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
