import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import moment from "moment";
import {
  useDeleteAttendanceMutation,
  useUpdateAttendanceMutation,
} from "@/redux/students/studentsApiSlice";
import { toast } from "sonner";

export default function AttendanceGrid({ selectedMonth, students }) {
  const [updateAttendance, { isSuccess }] = useUpdateAttendanceMutation();
  const [deleteAttendance, { isSuccess: delSuccess }] =
    useDeleteAttendanceMutation();
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);
  const [studentName, setStudentName] = useState("");

  // Helper function to calculate days in the selected month
  const calculateDaysInMonth = (selectedMonth) => {
    const year = moment(selectedMonth, "MM/YYYY").year();
    const month = moment(selectedMonth, "MM/YYYY").month(); // 0-indexed
    return new Date(year, month + 1, 0).getDate(); // Last day of the month
  };

  useEffect(() => {
    if (students && selectedMonth) {
      const daysInMonth = calculateDaysInMonth(selectedMonth);

      // Create column definitions for each day of the month
      const newColDefs = [
        {
          headerName: "Name",
          field: "name",
          filter: true,
          checkboxSelection: false,
        },
        ...Array.from({ length: daysInMonth }, (_, i) => ({
          headerName: (i + 1).toString(),
          field: `day${i + 1}`,
          width: 50,
          editable: true,
        })),
      ];
      setColDefs(newColDefs);

      // Map student data to row data with attendance info, filling missing days
      const rows = students.map((student) => {
        const row = { name: student.name, id: student._id };

        // Initialize all days to false (not present)
        for (let i = 1; i <= daysInMonth; i++) {
          row[`day${i}`] = false;
        }

        // Update days based on attendance data
        student.attendance.forEach((att) => {
          const day = moment(att.date).date(); // Extract the day from the date
          row[`day${day}`] = att.isPresent;
        });

        return row;
      });
      setRowData(rows);
    }
  }, [students, selectedMonth]);

  useEffect(() => {
    if (isSuccess) {
      toast(`${studentName} marked as present`);
    }
    if (delSuccess) {
      toast(`${studentName} marked as absent`);
    }
  }, [isSuccess, delSuccess, studentName]);

  const attendanceChange = (colDefField, id, isPresent, studentName) => {
    const day = parseInt(colDefField.replace("day", ""), 10);
    const date = moment(selectedMonth, "MM/YYYY")
      .date(day)
      .format("YYYY-MM-DD");

    setStudentName(studentName);

    if (isPresent) {
      updateAttendance({
        id,
        dateMonthDay: date,
        isPresent,
      });
    } else {
      deleteAttendance({ id, date });
    }
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          domLayout="autoHeight"
          onCellValueChanged={(e) =>
            attendanceChange(e.colDef.field, e.data.id, e.newValue, e.data.name)
          }
        />
      </div>
    </div>
  );
}
