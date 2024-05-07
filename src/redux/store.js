import { configureStore } from "@reduxjs/toolkit";
import { jobsApi } from "./api";
import { jobsReducer } from "./jobsSlice";

export const store = configureStore({
  reducer: {
    [jobsApi.reducerPath]: jobsApi.reducer,
    jobs: jobsReducer,
  },
  //adding bot default middleware and rtk query middleware
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    jobsApi.middleware,
  ],
});
