import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateStudentMutation } from "@/redux/students/studentsApiSlice";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddNewStudents({ refetch }) {
  const [createStudent, { isSuccess, isLoading, error }] =
    useCreateStudentMutation();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      refetch();
      reset();
      setOpen(false);
      toast("New Student Added");
    }
  }, [isSuccess, refetch, reset]);

  const onSubmit = async (data) => {
    await createStudent(data);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add new Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label htmlFor="">Full Name</label>
                  <Input
                    placeholder="Ex. adam"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="">Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: true })}
                  >
                    <option value={"5th"}>5th</option>
                    <option value={"6th"}>6th</option>
                    <option value={"7th"}>7th</option>
                  </select>
                </div>
                <div className="py-2">
                  <label htmlFor="">Contact Number</label>
                  <Input
                    placeholder="Ex. 11225566878"
                    {...register("contact")}
                    type="number"
                  />
                </div>
                <div className="py-2">
                  <label htmlFor="">Address</label>
                  <Input
                    placeholder="Ex. 301 street Ng."
                    {...register("address")}
                  />
                </div>

                <div className="flex items-center gap-3 justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disable={isLoading}>
                    {isLoading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
