import React from "react";
import AddNewStudents from "./_components/AddNewStudents";
import PersistLogin from "@/components/PersistLogin";
import StudentListTable from "./_components/StudentListTable";
import { useGetStudentsQuery } from "@/redux/students/studentsApiSlice";

export default function Students() {
  const { data, refetch } = useGetStudentsQuery();
  return (
    <PersistLogin>
      <div>
        <h2 className="font-bold text-2xl flex justify-between items-center">
          Students <AddNewStudents refetch={refetch} />
        </h2>

        <StudentListTable data={data} refetch={refetch} />
      </div>
    </PersistLogin>
  );
}
