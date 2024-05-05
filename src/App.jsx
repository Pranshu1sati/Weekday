// import React, { useEffect, useState } from "react";
// import { useGetJobsMutation } from "./redux/api";

// function App() {
//   const [allJobs, setAllJobs] = useState([]);
//   const [offset, setoffset] = useState(0);
//   // const [limit, setlimit] = useState(10);
//   const [getJobs, { isLoading, isError, isSuccess, data, error }] =
//     useGetJobsMutation();

//   useEffect(() => {
//     // console.log(limit);
//     getJobs(offset);
//     if (!isLoading && !isError && isSuccess && data) {
//       console.log(typeof data.jbList);
//       setAllJobs(data?.jdList);
//     }
//   }, []);
//   useEffect(() => {
//     getJobs(offset).then((result) => {
//       setAllJobs((prevJobs) => [...prevJobs, ...result.data.jdList]);
//     });
//   }, [offset]);
//   // allJobs && console.log("Offset", offset, "Alljobs", allJobs, "\n");
//   !error && data && console.log(offset, data, error);
//   allJobs?.length > 0 && console.log(allJobs);
//   return (
//     <div>
//       <button
//         onClick={() => {
//           setoffset((prev) => prev + 10);
//         }}
//         style={{ backgroundColor: "white", color: "black" }}
//       >
//         Refetch {offset}
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { useGetJobsMutation } from "./redux/api";

function App() {
  const [allJobs, setAllJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [getJobs] = useGetJobsMutation();

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (windowHeight + scrollTop + 10 >= documentHeight) {
        // Fetch more data when scrolled to the bottom
        setOffset((prevOffset) => prevOffset + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch data when offset changes
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await getJobs(offset);
        setIsLoading(false);
        setData(result.data);
        setAllJobs((prevJobs) => [...prevJobs, ...result.data.jdList]);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      }
    };

    fetchData();
  }, [offset]);

  return (
    <div>
      {allJobs.map((job, idx) => (
        <div key={idx}>
          {/* Render job data */}
          {job.jobRole} - {job.companyName}
        </div>
      ))}
      {/* Loader element */}
      {isLoading && <div>Loading...</div>}
      {/* Error message */}
      {isError && <div>Error: {error.message}</div>}
    </div>
  );
}

export default App;
