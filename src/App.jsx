import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset, setTotalCount } from "./redux/jobsSlice";
import { useGetJobsMutation } from "./redux/api";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import JobCard from "./components/JObCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function App() {
  const dispatch = useDispatch();

  const [end, setEnd] = useState(false);

  const { jobs, totalCount } = useSelector((state) => state.jobs);

  const [offset, setOffset] = useState(0);

  const [getJobs, { isLoading, isError, error }] = useGetJobsMutation();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [isLoading]);

  const fetchData = useCallback(
    debounce(async () => {
      if (totalCount <= jobs?.length) {
        setEnd(true);
        return;
      }
      if (isLoading) return;
      try {
        console.log(offset);
        const result =
          !isLoading &&
          (await getJobs(offset).then((result) =>
            setOffset((prev) => prev + result?.data?.jdList?.length)
          ));
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }, 500), // Adjust the delay as needed
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

  console.log(offset, end);

  return (
    <div className="container">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {jobs.map((job, idx) => (
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
        <>Thats All</>
      ) : (
        isLoading && <div className="loader">Loading...</div>
      )}
      {/* Error message */}
      {isError && <div className="error">Error: {error.message}</div>}
    </div>
  );
}

export default App;
