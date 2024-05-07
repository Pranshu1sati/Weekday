import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const myHeaders = {
  "Content-Type": "application/json",
};
// To send offset 0 for first api call and actual values after the first calls
const generateBody = (offset) => {
  console.log("Offset: ", offset);
  const body = JSON.stringify({
    offset: offset ? offset : 0,
    limit: 20,
  });
  console.log(body);
  return body;
};

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weekday.technology/adhoc",
    // prepareHeaders: (headers) => ({ ...headers, ...requestOptions.headers })
  }),
  endpoints: (builder) => ({
    // Use mutation instead of query
    getJobs: builder.mutation({
      query: (offset) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/getSampleJdJSON",
        method: "POST",
        body: generateBody(offset),
      }),
    }),
  }),
});

export const { useGetJobsMutation } = jobsApi;
