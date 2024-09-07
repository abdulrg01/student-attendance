import React, { useEffect, useState } from "react";
import MonthSelection from "@/components/MonthSelection";
import Grade from "@/components/Grade";
import AttendanceGrid from "./components/AttendanceGrid";
import { useStudentsRecordQuery } from "@/redux/students/studentsApiSlice";
import moment from "moment";
import PersistLogin from "@/components/PersistLogin";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/auth/authSlice";

export default function Attendance() {
  const token = useSelector(selectCurrentToken);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrad, setSelectedGrad] = useState();

  const month = selectedMonth ? moment(selectedMonth).format("YYYY/MM") : null;

  const { data } = useStudentsRecordQuery({
    month,
    grade: selectedGrad,
  });

  useEffect(() => {
    if (token) {
      setSelectedGrad("5th");
      setSelectedMonth("2024-08-01");
    }
  }, [token]);

  return (
    <PersistLogin>
      <div className="pt-10 px-3">
        <h2 className="text-2xl font-bold">Attendance</h2>
        {/*Search Option */}
        <div className="flex gap-5 p-5 border rounded-lg shadow-sm my-5 items-center">
          <div className="flex items-center md:flex-row flex-col gap-2">
            <label>Select Month:</label>
            <MonthSelection selectedMonth={(v) => setSelectedMonth(v)} />
          </div>
          <div className="flex items-center md:flex-row flex-col gap-2">
            <label>Select Grade:</label>
            <Grade selectedGrad={(v) => setSelectedGrad(v)} />
          </div>
        </div>
        {/* Student Attendance Grid */}
        <AttendanceGrid selectedMonth={selectedMonth} students={data} />
      </div>
    </PersistLogin>
  );
}
