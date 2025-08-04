import type { RootState } from "@/redux/store/store";
import {
  fetchBaseQuery,
  type FetchArgs,
  type BaseQueryFn,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { logoutUser, setUser } from "../auth/authSlice";
const backendUrl = import.meta.env.VITE_API_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: `${backendUrl}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Enhanced baseQuery with automatic refresh logic
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    try {
      const res = await fetch(`${backendUrl}/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Refresh failed:", res.status, errText);
        api.dispatch(logoutUser());
        return result;
      }

      const data = await res.json();
      const newAccessToken = data?.data?.accessToken;

      if (newAccessToken) {
        const user = (api.getState() as RootState).auth.user;
        api.dispatch(
          setUser({
            user,
            token: newAccessToken,
          })
        );
        
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logoutUser());
      }
    } catch (error) {
      console.error("Token refresh exception:", error);
      api.dispatch(logoutUser());
    }
  }

  if(result?.error?.status == 500){
    console.log(result.error.data)
  }
  if(result?.error?.status == 409){
    console.log(result.error.data)
  }
  return result;
};


// Base API instance
export const baseApi = createApi({
  reducerPath: "BaseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Cars", "Brands"],
  endpoints: () => ({}),
});
