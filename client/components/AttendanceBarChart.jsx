import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { useAttendanceDataQuery } from "@/redux/students/studentsApiSlice";

const AttendanceBarChart = ({ date }) => {
  const [chartData, setChartData] = useState([]);

  // Fetch the attendance data for the last 7 days
  const {
    data: attendanceData,
    error,
    isLoading,
  } = useAttendanceDataQuery(date);

  useEffect(() => {
    if (attendanceData && attendanceData.length > 0) {
      const processedData = [];

      // Get the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) =>
        moment(date).subtract(i, "days").format("YYYY-MM-DD")
      ).reverse();

      last7Days.forEach((day) => {
        const dayAttendance = attendanceData.filter(
          (record) => moment(record.date).format("YYYY-MM-DD") === day
        );
        const presentCount = dayAttendance.filter(
          (record) => record.isPresent
        ).length;
        const absentCount = dayAttendance.length - presentCount;

        processedData.push({ day, Present: presentCount, Absent: absentCount });
      });

      setChartData(processedData);
    }
  }, [attendanceData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="my-2 font-bold text-lg"></h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Present" name="Total Present" fill="#4CAF50" />
          <Bar dataKey="Absent" name="Total Absent" fill="#F44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceBarChart;
