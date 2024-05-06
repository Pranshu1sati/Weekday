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
