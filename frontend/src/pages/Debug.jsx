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
  const [date, setDate] = useState(new Date());
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
          <div className="">
            <div className="flex flex-col flex-wrap items-start gap-2 @md:flex-row">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
              />
            </div>
            <div>

              
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
