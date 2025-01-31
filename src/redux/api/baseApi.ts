// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: () => ({}),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {} = baseApi;
