import React, { useEffect, useState } from "react";
import PersistLogin from "../../../components/PersistLogin";
import MonthSelection from "../../../components/MonthSelection";
import Grade from "../../../components/Grade";
import { useStudentsRecordQuery } from "@/redux/students/studentsApiSlice";
import moment from "moment";
import StatusList from "@/pages/dashboard/_components/StatusList";
import AttendanceBarChart from "../../../components/AttendanceBarChart";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/redux/auth/authSlice";

export default function Home() {
  const token = useSelector(selectCurrentToken);
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrad, setSelectedGrad] = useState();

  const month = selectedMonth ? moment(selectedMonth).format("YYYY/MM") : null;

  const today = moment(selectedMonth, "YYYY/MM").format("YYYY-MM-DD");

  const { data } = useStudentsRecordQuery({ month, grade: selectedGrad });

  useEffect(() => {
    if (token) {
      setSelectedGrad("5th");
      setSelectedMonth("2024-08-01");
    }
  }, [token]);

  return (
    <PersistLogin>
      <div className="flex items-center justify-between flex-wrap pt-10">
        <h1 className="text-3xl font-bold my-5">Dashboard</h1>

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
      </div>

      <StatusList students={data} selectedMonth={selectedMonth} />

      <div>
        <h2>Student Attendance for the Last 7 Days</h2>
        <AttendanceBarChart date={today} />
      </div>
    </PersistLogin>
  );
}
