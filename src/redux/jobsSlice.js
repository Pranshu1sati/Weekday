import { createSlice } from "@reduxjs/toolkit";
import { jobsApi } from "./api";

const initialState = {
  jobs: [],
  filteredJobs: [],
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
    setFilter(state, action) {
      const { filterBy, filterValue } = action.payload; // Destructure filter details

      state.filteredJobs = state?.jobs?.filter((job) => {
        switch (filterBy) {
          case "role":
            if (!filterValue) return true;
            return (
              job?.jobRole?.toLowerCase() ===
              (filterValue ? filterValue?.toLowerCase() : "")
            );
          case "minExp":
            if (!filterValue) return true;
            return job?.minExp >= filterValue; // Assuming experience field
          case "remote":
            if (!filterValue) return true;
            console.log(filterValue);
            return filterValue?.toLowerCase() === "remote"
              ? job?.location?.toLowerCase() === "remote"
              : job?.location?.toLowerCase() !== "remote";

          case "minSalary":
            if (!filterValue) return true;
            return job?.minJdSalary >= filterValue;
          case "companyName":
            if (!filterValue) return true;
            if (typeof filterValue !== "string" && filterValue?.length <= 1)
              return true;
            return job?.companyName
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          case "location":
            if (!filterValue) return true;
            if (typeof filterValue !== "string" && filterValue?.length <= 1)
              return true;
            else
              return job?.location
                ?.toLowerCase()
                .includes(filterValue.toLowerCase());
          default:
            return true;
        }
      });
    },
    clearFilters(state) {
      state.filteredJobs = []; // Reset filteredJobs to empty array
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
        state.filteredJobs = [...state.filteredJobs, ...action.payload.jdList];
        state.totalCount = action.payload.totalCount;
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        // state.filteredJobs = [...filteredJobs, ...action.payload.jdList];
      })
      .addMatcher(jobsApi.endpoints.getJobs.matchRejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error;
      });
  },
});

export const { setOffset, setTotalCount, setFilter } = jobsSlice.actions;

export const jobsReducer = jobsSlice.reducer;
