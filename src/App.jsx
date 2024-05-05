import React, { useEffect, useState } from "react";
import { useGetJobsMutation } from "./redux/api";

function App() {
  const [allJobs, setAllJobs] = useState([]);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(10);
  const [getJobs, { isLoading, isError, isSuccess, data, error }] =
    useGetJobsMutation(offset, limit);

  useEffect(() => {
    if (allJobs?.length == 0) {
      getJobs(940, 10);
      if (!isLoading && !isError && isSuccess && data) {
        setAllJobs((prevJobs) => [...prevJobs, ...data.jdList]);
      }
    }
  }, []);
  allJobs && console.log(allJobs);
  console.log(data, error);
  return <div></div>;
}

export default App;
