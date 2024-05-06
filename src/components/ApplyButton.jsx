import React from "react";
import Button from "@mui/material/Button";
const ApplyButton = ({ href }) => {
  return (
    <Button
      to={href || "#"}
      //   variant="contained"
      style={{
        backgroundColor: "#55efc4",
        color: "black",
        paddingTop: "0.5rem",
        paddingBottom: " 0.5rem ",
        width: "100%",
      }}
      target="_blank"
    >
      ⚡ Easy Apply
    </Button>
  );
};

export default ApplyButton;
