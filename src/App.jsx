import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffset, setTotalCount } from "./redux/jobsSlice";
import { useGetJobsMutation } from "./redux/api";

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
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    )
      return;
    fetchData();
  };

  console.log(offset, end);

  return (
    <div className="container">
      {jobs.map((job, idx) => (
        <div key={idx} className="card">
          <div className="cardContent">
            {/* Render job data */}
            {job.jobRole} - {job.companyName}
          </div>
        </div>
      ))}
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
