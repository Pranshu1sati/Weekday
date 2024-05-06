import { createSlice } from "@reduxjs/toolkit";
import { jobsApi } from "./api";

const initialState = {
  jobs: [],
  totalCount: 10,
  isLoading: false,
  isError: false,
  error: null,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setOffset(state, action) {
      state.offset = action.payload;
    },
    setTotalCount(state, action) {
      state.totalCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(jobsApi.endpoints.getJobs.matchPending, (state, action) => {
        state.isLoading = true;
        state.isError = false; // Reset error state when a new request starts
        state.error = null;
      })
      .addMatcher(jobsApi.endpoints.getJobs.matchFulfilled, (state, action) => {
        state.jobs = [...state.jobs, ...action.payload.jdList];
        state.totalCount = action.payload.totalCount;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addMatcher(jobsApi.endpoints.getJobs.matchRejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const { setOffset, setTotalCount } = jobsSlice.actions;

export const jobsReducer = jobsSlice.reducer;
