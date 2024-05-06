import React from "react";
import { Button } from "@mui/material";

const ReferralButton = () => {
  return (
    <Button
      variant="contained"
      fullWidth
      className="my-1"
      sx={{
        bgcolor: "#4943da",
        color: "white",
        fontSize: "1rem",
        fontWeight: "medium",
        py: "0.625rem",
        px: "1.25rem",
        transition: "all 0.3s ease-out",
        "&:hover": {
          bgcolor: "#4943da",
          color: "white",
          ring: "1px solid #4943da",
        },
      }}
    >
      Unlock referral asks
    </Button>
  );
};

export default ReferralButton;
