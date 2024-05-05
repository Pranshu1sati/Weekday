import React, { useEffect, useState } from "react";
import { useGetJobsMutation } from "./redux/api";

function App() {
  const [offset, setoffset] = useState();
  const [limit, setlimit] = useState(10);
  const [getJobs, { isLoading, isError, isSuccess, data, error }] =
    useGetJobsMutation(0, 10);

  useEffect(() => {
    // Perform the getPosts mutation when the component mounts
    getJobs(0, 10);
  }, []);

  console.log(data, error);
  return <div></div>;
}

export default App;
