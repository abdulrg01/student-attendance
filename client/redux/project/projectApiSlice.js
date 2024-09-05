import { apiSlice } from "../api/apiSlice";

const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (credentials) => ({
        url: "/projects/new-project",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getProjects: builder.query({
      query: () => ({
        url: "/projects/get-all-project",
        method: "GET",
      }),
    }),
    getAProject: builder.query({
      query: (id) => ({
        url: `/projects/get-a-project/${id}`,
        method: "GET",
      }),
    }),
    updateProject: builder.mutation({
      query: (credential) => ({
        url: `/projects/update-project`,
        method: "GET",
        body: { ...credential },
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAProjectQuery,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} = projectApiSlice;
