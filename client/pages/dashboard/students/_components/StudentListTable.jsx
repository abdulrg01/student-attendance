import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useDeleteStudentMutation } from "@/redux/students/studentsApiSlice";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

export default function StudentListTable({ data, refetch }) {
  const [deleteStudent, { isSuccess, isLoading, error }] =
    useDeleteStudentMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast("Student deleted successfully!");
    }
  }, [isSuccess, refetch]);

  const CustomButtons = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size="sm" variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(props?.data?._id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "_id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "contact", filter: true },
    { field: "action", cellRenderer: CustomButtons },
  ]);

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    data && setRowData(data);
  }, [data]);

  const handleDelete = async (id) => {
    await deleteStudent(id);
  };

  return (
    <div className="my-7">
      {/* wrapping container with theme & size */}
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div className="flex items-center justify-between mb-5">
          <Button className="flex flex-col">
            Total Students {data && data.length}
          </Button>

          <div className="p-2 rounded-lg border shadow-sm flex gap-2 max-w-sm">
            <Search />
            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search on Anything..."
              className="w-full outline-none text-gray-400 dark:text-gray-400"
            />
          </div>
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}
