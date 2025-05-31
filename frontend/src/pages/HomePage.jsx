import { useState, useEffect } from "react";
import Navbar from "../assets/components/navbar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiBook2Fill } from "react-icons/ri";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
function HomePage() {
  const [logs, setLog] = useState(null);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);
  const [regret, setRegret] = useState("");
  const [showReframe, setShowReframe] = useState(false);
  const [reframe, setReframe] = useState("");
  const [regretReframed, setRegretReframed] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editable, setEditable] = useState(false); // whether the textarea is editable
  const [exists, setExists] = useState(false);
  const [ideas, setIdeas] = useState(null);
  const [matchedIdea, setMatchedIdea] = useState(null);
  const [selectedIdea,setSelectedIdea] = useState(null);
  const handleSubmitReframer = async () => {
    try {
      const data = {
        id: logs.id,
        regret: reframe,
      };
      const res = await axios.post(`http://localhost:3001/idea/reframe`, data);
      setShowReframe(true);
      setRegretReframed(res.data.reframed);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (exists) {
        const data = {
          regret: regret,
        };
        const res = await axios.patch(
          `http://localhost:3001/idea/${logs.id}`,
          data
        ); // PATCH if editing
      } else {
        const data = {
          userId: user.id,
          regret: regret,
        };

        const res = await axios.post("http://localhost:3001/idea", data); // POST if new
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
    setEditable(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/api/profile", {
          withCredentials: true,
        });

        setUser(res.data.user.user);
        setIdeas(res.data.user.user.ideas);
      } catch (err) {
        console.log(err);
        window.location.href = "/login";
      }
    };
    const fetchIdea = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/idea/${user?.id}`, {
          withCredentials: true,
        });
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchTodayLog = async () => {
      try {
        const res = await axios.get("http://localhost:3001/idea/api/today", {
          withCredentials: true,
        });
        console.log(res.data.idea);

        if (res.data?.idea) {
          setExists(true);
        }
        if (res.data.idea.reframed_regret) {
          setRegretReframed(res.data.idea.reframed_regret);
          setShowReframe(true);
        }

        setLog(res.data.idea);
        setRegret(res.data.idea.regret);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    fetchIdea();
    fetchTodayLog();
  }, []);

  useEffect(() => {
    const log = ideas?.find((idea) => {
      const ideaDate = new Date(idea.createdAt).toISOString().split("T")[0];
      const selected = selectedDate.toISOString().split("T")[0];
      return ideaDate === selected;
    });
    console.log(log);
  }, [selectedDate]);
  if (!user) return <p>Loading...</p>;
  const handleDateSelect = (date) => {
    if (!date) return;
    console.log(date);

    setSelectedDate(date);

    const selectedYMD = date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Singapore",
    });

    const foundIdea = ideas.find((idea) => {
      const ideaYMD = new Date(idea.createdAt).toLocaleDateString("en-CA", {
        timeZone: "Asia/Singapore",
      });
      console.log(ideaYMD, selectedYMD);

      return ideaYMD === selectedYMD;
    });

    setMatchedIdea(foundIdea || null);
    
      setSelectedIdea(foundIdea);
    
    console.log("Matched idea:", foundIdea);
  };

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

            <textarea
              placeholder="Describe the action or inaction you regret from today."
              className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
              value={regret}
              onChange={(e) => setRegret(e.target.value)}
              disabled={!editable}
            />

            {editable ? (
              <button
                className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end"
                onClick={handleSubmit}
              >
                Save Log
              </button>
            ) : (
              <button
                className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end"
                onClick={() => setEditable(true)}
              >
                {exists ? "Edit Log" : "Save Log"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-[#F0F4F5] border -center px-4 py-2 mt-2 rounded-lg shadow-lg hover:bg-[#4A6B5F] self-end hover:text-white">
              View Calendar Log
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Calendar of Regret</DialogTitle>
              <DialogDescription>
                Select a date to view your reflections. Dates with logs are
                highlighted.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-8 w-2xl max-w-xs lg:max-w-4xl flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
              {/* Calendar Card */}
              <div className="bg-white p-4 rounded-xl shadow-lg w-full lg:w-[350px] mb-6 lg:mb-0 border border-gray-300">
                <h2 className="text-2xl font-bold mb-1 text-center lg:text-left">
                  Calendar Of Regrets
                </h2>
                <p className="text-sm text-gray-500 mb-4 text-center lg:text-left">
                  Select a date to view your reflection.
                  <br />
                  Date with logs
                </p>
                <h3 className="text-md font-semibold mb-2">Select date</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                />
              </div>
              {/* Reflection Card */}
              <div className="w-full lg:w-[350px]">
                <h4 className="font-bold text-lg mb-2">
                  Reflection for:{" "}
                  {selectedDate
                    ? selectedDate.toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No date selected"}
                </h4>
                <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
                  <span className="font-semibold">Your Regret:</span>
                  <p className="mt-2 text-gray-800">
                    {selectedIdea && selectedIdea.regret
                      ? selectedIdea.regret
                      : "No regret logged for this date."}
                  </p>
                  <button className="flex items-center text-green-700 font-semibold mt-4 hover:underline">
                    <span className="mr-2">➕</span> Reframe this regret
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <button variant="outline">Cancel</button>
              </DialogClose>
              <button type="submit">Save changes</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            <button
              className="bg-[#5E8B7E] text-white px-4 py-2 mt-4 rounded-lg hover:bg-[#4A6B5F] justify-end self-end "
              onClick={handleSubmitReframer}
            >
              Generate Reflection
            </button>
            {showReframe ? (
              <div className="mt-2">
                <h1>Reframed Regret</h1>
                <textarea
                  placeholder="Describe the action or inaction you regret from today."
                  className="w-full bg-[#F0F4F5] p-2 mt-2 border border-gray-300 rounded-lg h-32 align-top resize-none"
                  value={regretReframed}
                  disabled
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10"></div>
    </div>
  );
}
export default HomePage;
