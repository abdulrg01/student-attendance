import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials, setUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/users/new-user",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    socialAuth: builder.mutation({
      query: (credentials) => ({
        url: "/users/social-auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/users/auth/update/profile",
        method: "PUT",
        body: { avatar },
      }),
    }),
    editProfile: builder.mutation({
      query: (name) => ({
        url: "/users/updateUser",
        method: "PATCH",
        body: { name },
      }),
    }),
    getUserInfo: builder.query({
      query: (id) => ({
        url: `users/auth/${id}`,
        method: "GET",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { token, user } = data;
          dispatch(setCredentials({ token }));
          dispatch(setUser({ user }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useSocialAuthMutation,
  useGetUserInfoQuery,
  useEditProfileMutation,
  useUpdateAvatarMutation,
  useRefreshMutation,
  useSendLogoutMutation,
  useLoginMutation,
} = authApiSlice;
