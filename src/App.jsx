import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset, setTotalCount } from "./redux/jobsSlice";
import { useGetJobsMutation } from "./redux/api";
import { debounce } from "./utils/debounce";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import JobCard from "./components/JObCard";
import Filters from "./components/Filters";
import { Box, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const dispatch = useDispatch();

  const [end, setEnd] = useState(false);

  const { jobs, filteredJobs, totalCount } = useSelector((state) => state.jobs);

  const [offset, setOffset] = useState(0);
  const [allJobs, setAllJobs] = useState(jobs);

  const [getJobs, { isLoading, isError, error }] = useGetJobsMutation();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [isLoading]);

  const fetchData = useCallback(
    //causing intentional so that data is fetched smoothly and not immediately after the first call is fulfilled

    debounce(async () => {
      // return when last job is reached
      if (totalCount <= jobs?.length) {
        setEnd(true);
        return;
      }
      // no requests while the status is already loading
      if (isLoading) return;
      try {
        console.log(offset);
        // to ensure no request is made when status is already loading
        const result =
          !isLoading &&
          (await getJobs(offset).then((result) =>
            setOffset((prev) => prev + result?.data?.jdList?.length)
          ));
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }, 100), // Adjust the delay as needed
    [isLoading, offset]
  );

  const handelInfiniteScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 <=
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    fetchData();
  };

  console.log(offset, end, allJobs);

  return (
    <div
      className="flex flex-col gap-x-1 p-4"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        columnGap: "0.25rem",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flex: "1",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.75rem",
        }}
      >
        <Filters />
      </div>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {filteredJobs?.map((job, idx) => (
          <Grid item xs={2} sm={4} md={4} key={idx}>
            {/* <div className="card">
              <div className="cardContent">
                 Render job data 
                {job?.jobRole} - {job?.companyName}
              {/* </div> 
            // </div> */}
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      {/* Loader element */}
      {end ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            height: 100,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h2" gutterBottom>
            No More Jobs
          </Typography>
        </Box>
      ) : (
        isLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )
      )}
      {/* Error message */}
      {isError && <div className="error">Error: {error.message}</div>}
    </div>
  );
}

export default App;
