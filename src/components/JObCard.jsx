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
          <div>
            <h4 style={{ fontWeight: "600", color: "gray" }}>
              {job.companyName}
            </h4>
            <p style={{ fontWeight: "200", color: "black" }}>{job.jobRole}</p>
            <p style={{ fontWeight: "250", color: "black" }}>{job.location}</p>
          </div>
        </div>
      </div>
      <p style={{ fontWeight: "350", color: "black" }}>
        Estimated Salary: {getSalary(job?.minJdSalary, job?.maxJdSalary)}
      </p>
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
