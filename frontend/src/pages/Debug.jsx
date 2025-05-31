import { Button } from "@/components/ui/button";
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
import { useState, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { Input } from "@/components/ui/input";
export default function Debug() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div className="pt-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
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
                onSelect={(date) => setSelectedDate(date)}
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
                  {/* {logs && logs.regret
                    ? logs.regret
                    : "No regret logged for this date."} */}
                    asd
                </p>
                <button className="flex items-center text-green-700 font-semibold mt-4 hover:underline">
                  <span className="mr-2">➕</span> Reframe this regret
                </button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
