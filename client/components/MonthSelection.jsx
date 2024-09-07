import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import moment from "moment";
import { Calendar } from "./ui/calendar";
import { selectCurrentToken } from "@/redux/auth/authSlice";
import { useSelector } from "react-redux";

export default function MonthSelection({ selectedMonth }) {
  const token = useSelector(selectCurrentToken);
  const [month, setMonth] = useState();

  useEffect(() => {
    if (token) {
      setMonth("2024-08-01");
    }
  }, [token]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="flex items-center gap-2 text-slate-500"
            variant="outline"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMM yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            month={month}
            onMonthChange={(value) => {
              selectedMonth(value);
              setMonth(value);
            }}
            className="flex flex-1 justify-center"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
