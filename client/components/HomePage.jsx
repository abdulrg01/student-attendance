import React, { useState } from "react";
import PersistLogin from "./PersistLogin";
import MonthSelection from "./MonthSelection";
import Grade from "./Grade";
import { useStudentsRecordQuery } from "@/redux/students/studentsApiSlice";
import moment from "moment";
import StatusList from "@/pages/dashboard/_components/StatusList";
import AttendanceBarChart from "./AttendanceBarChart";

export default function HomePage() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrad, setSelectedGrad] = useState();

  const month = selectedMonth ? moment(selectedMonth).format("YYYY/MM") : null;

  const { data } = useStudentsRecordQuery({ month, grade: selectedGrad });

  const today = moment(selectedMonth).format("YYYY/MM");

  return (
    <PersistLogin>
      <div className="flex items-center justify-between pt-10">
        <h1 className="text-3xl font-bold my-5">Dashboard</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center md:flex-row flex-col gap-2">
            <label>Select Month:</label>
            <MonthSelection selectedMonth={(v) => setSelectedMonth(v)} />
          </div>
          <div className="flex items-center md:flex-row flex-col gap-2">
            <label>Select Grade:</label>
            <Grade selectedGrad={(v) => setSelectedGrad(v)} />
          </div>
        </div>
      </div>

      <StatusList students={data} selectedMonth={selectedMonth} />

      <div>
        <h2>Student Attendance for the Last 7 Days</h2>
        <AttendanceBarChart date={today} />
      </div>
    </PersistLogin>
  );
}
