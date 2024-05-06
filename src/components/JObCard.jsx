import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
  CardActions,
} from "@mui/material";
import Model from "./Model";
import ApplyButton from "./ApplyButton";
import ReferralButton from "./refereButton";

function getSalary(x, y) {
  let xS = "";
  let yS = "";
  let dash =
    x != null && x != undefined && y != null && y != undefined ? "-" : "";
  if (x != null && x != undefined) {
    xS = x.toString();
  } else {
    xS = "";
  }

  if (y != null && y != undefined) {
    yS = y.toString();
  } else {
    yS = "";
  }
  return `${xS} ${dash} ${yS} LPA`;
}

const JobCard = ({ job }) => {
  return (
    // <Card
    //   sx={{ Width: 250 }}
    //   style={{ paddingLeft: "0.5rem", paddingRight: "0.5rem" }}
    // >
    //   <Box sx={{ display: "flex", flexDirection: "column ", gap: 1 }}>
    //     <div>
    //       <CardHeader
    //         avatar={
    //           <Avatar
    //             src={job?.logoUrl}
    //             alt={`https://example.com/path/to/${job?.companyName}.jpg`} // Replace this with the actual image URL
    //             sx={{ width: 56, height: 56 }}
    //           />
    //         }
    //         title={
    //           <Typography variant="h6" color="textSecondary" mb="-1">
    //             {job?.companyName}
    //           </Typography>
    //         }
    //         subheader={
    //           <React.Fragment>
    //             <Typography variant="subtitle-1" color="textPrimary" mb="-5">
    //               {job?.jobRole}
    //             </Typography>
    //             <br />
    //             <Typography variant="subtitle-3" color="textPrimary" mb="-5">
    //               {job?.location}
    //             </Typography>
    //           </React.Fragment>
    //         }
    //       />
    //     </div>
    //     <Box sx={{ display: "flex", flexDirection: "column ", gap: 1 }}>
    //       <CardContent>
    //         <Typography variant="subtitle-1" color="textSecondary" mb="1.5">
    //           <strong>Estimated Salary:</strong>
    //           {job?.maxJdSalary}
    //           {/* {job?.minJdSalary
    //         ? job?.minJdSalary
    //         : "" + job?.maxJdSalary
    //         ? ` ${job?.maxJdSalary}` + " LPA"
    //         : ""}{" "} */}
    //           ✅
    //         </Typography>
    //         <div>
    //           <h2
    //             className="font-medium  text-black"
    //             style={{ fontWeight: 500 }}
    //           >
    //             About Company:
    //           </h2>
    //           <p
    //             className="text-sm opacity-90 leading-5"
    //             style={{
    //               fontSize: "0.875rem",
    //               lineHeight: "1.25rem",
    //               opacity: 0.9,
    //               lineHeight: "1.25rem",
    //             }}
    //           >
    //             {job?.jobDetailsFromCompany?.split(" ").slice(0, 90).join(" ") +
    //               "..."}
    //           </p>
    //         </div>
    //         <CardActions style={{ textAlign: "center", width: "100%" }}>
    //           <Model
    //             style={{ display: "flex", justifyContent: "center" }}
    //             content={job.jobDetailsFromCompany}
    //           />
    //         </CardActions>
    //       </CardContent>
    //     </Box>
    //   </Box>
    // </Card>
    <div className="card">
      <div className="card-header">
        <span className="date-posted">Posted recently</span>
      </div>
      <div className="job-details">
        <div>
          <div className="jobImg">
            <img
              src={job.logoUrl || "./placeholder.jpg"}
              alt="Company Logo"
              className="company-logo"
            />
          </div>
        </div>
        <div>
          <div className="jobContent">
            <h2>{job.companyName}</h2>
            <h3>{job.jobRole}</h3>
            <h4>{job.location}</h4>
            <p>
              Estimated Salary: {getSalary(job?.minJdSalary, job?.maxJdSalary)}
            </p>
          </div>
        </div>
      </div>
      <div className="card-body">
        <h1>About Company:</h1>
        <p className={"truncated"}>
          {job?.jobDetailsFromCompany?.split(" ").slice(0, 90).join(" ") +
            "..."}
        </p>
        <div className="show-more-button">
          <Model content={job?.jobDetailsFromCompany} />
        </div>
      </div>
      <div className="card-footer">
        <h3>Minimum Experience</h3>
        <h2>
          {job.minExp || 0} - {job.maxExp || 0} years
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "13px",
          }}
        >
          <ApplyButton href={job?.jdLink} />
          <ReferralButton />
        </div>
      </div>
    </div>
  );
};

export default JobCard;
