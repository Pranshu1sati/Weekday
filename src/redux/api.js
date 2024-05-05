import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const myHeaders = {
  "Content-Type": "application/json",
};

const generateBody = (offset, limit) => {
  console.log(offset, limit);
  const body = JSON.stringify({
    limit: limit ? limit : 10,
    offset: offset ? offset : 0,
  });
  console.log(body);
  return body;
};

export const jobsApi = createApi({
  reducerPath: "",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.weekday.technology/adhoc",
    // prepareHeaders: (headers) => ({ ...headers, ...requestOptions.headers })
  }),
  endpoints: (builder) => ({
    // Use mutation instead of query
    getJobs: builder.mutation({
      query: (offset, limit) => ({
        headers: {
          "Content-type": "application/json",
        },
        url: "/getSampleJdJSON",
        method: "POST",
        body: generateBody(offset, limit),
      }),
    }),
  }),
});

export const { useGetJobsMutation } = jobsApi;
