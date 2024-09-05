import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

export default function StatusList({ students, selectedMonth }) {
  const [presentPercentage, setPresentPercentage] = useState(0);
  const [absentPercentage, setAbsentPercentage] = useState(0);

  useEffect(() => {
    if (students && selectedMonth) {
      let totalDays = 0;
      let totalPresent = 0;

      students.forEach((student) => {
        student.attendance.forEach((att) => {
          const attendanceMonth = new Date(att.date).getMonth() + 1;
          const selectedMonthValue = parseInt(selectedMonth.split("-")[1], 10);

          if (attendanceMonth === selectedMonthValue) {
            totalDays += 1;
            if (att.isPresent) {
              totalPresent += 1;
            }
          }
        });
      });

      const presentPercentage =
        totalDays > 0 ? (totalPresent / totalDays) * 100 : 0;
      const absentPercentage = totalDays > 0 ? 100 - presentPercentage : 0;

      setPresentPercentage(presentPercentage.toFixed(2));
      setAbsentPercentage(absentPercentage.toFixed(2));
    }
  }, [students, selectedMonth]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCap />}
        title="Total Student"
        value={students}
      />
      <Card
        icon={<TrendingUp />}
        title="Total % Present"
        value={presentPercentage + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title="Total % Absent"
        value={absentPercentage + "%"}
      />
    </div>
  );
}
