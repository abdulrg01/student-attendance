import { apiSlice } from "../api/apiSlice";

const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (credentials) => ({
        url: "/students/new-student",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getStudents: builder.query({
      query: () => ({
        url: "/students/get-all-student",
        method: "GET",
      }),
    }),
    getAStudents: builder.query({
      query: (id) => ({
        url: `/students/get-a-student/${id}`,
        method: "GET",
      }),
    }),
    studentsRecord: builder.query({
      query: ({ month, grade }) => ({
        url: `/students/students-record?grade=${grade}&month=${month}`,
        method: "GET",
      }),
    }),
    updateStudents: builder.mutation({
      query: (credential) => ({
        url: `/students/update-students`,
        method: "GET",
        body: { ...credential },
      }),
    }),
    updateAttendance: builder.mutation({
      query: ({ id, dateMonthDay, isPresent }) => ({
        url: `/students/attendance/${id}/attendance`,
        method: "PUT",
        body: { dateMonthDay, isPresent },
      }),
    }),
    attendanceData: builder.query({
      query: (date) => ({
        url: `/students/attendance/last7days?date=${date}`,
        method: "GET",
      }),
    }),
    deleteAttendance: builder.mutation({
      query: ({ id, date }) => ({
        url: `/students/delete-attendance/${id}`,
        method: "DELETE",
        body: { date },
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: "/students/delete-student",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAStudentsQuery,
  useGetStudentsQuery,
  useStudentsRecordQuery,
  useUpdateAttendanceMutation,
  useUpdateStudentsMutation,
  useAttendanceDataQuery,
  useDeleteAttendanceMutation,
  useDeleteStudentMutation,
} = studentsApiSlice;
