# WeekDay Assignment Project(Round 1)

How to run locally.

## Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Node.js
- npm

## Getting Started with Local Setup

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Pranshu1sati/Weekday.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weekdy-assign
   ```

3. Install the dependencies:

   ```bash
   npm install/yarn install
   ```

4. Start the development server:

   ```bash
   npm run dev/yarn dev
   ```

5. Open your browser and visit [http://localhost:5173](http://localhost:5173) to see the running application.

6. Task understanding & Description Build an Infinite Scroll with filtering functionality using React, Redux, MUI, & CSS

   - Replicate this UI as closely as possible
     ![UI Image Provided in Task Doc](./src/assets/UI.png)

7. Approach and Plan of attack

   - Set UP Redux Toolkit Query Api Slice to fetch data
   - Set up login for offset and limit
   - Bind the API Slice with Redux Store
   - Build Extra Reducers for storing new data from api slice in redux store
   - Build Reducers for filtering the data

8. Api Slice
   - Job Slice
   ```
   import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
    const myHeaders = {
    "Content-Type": "application/json",
    };

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
    ```
