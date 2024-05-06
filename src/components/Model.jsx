import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  bgcolor: "background.paper",
  border: "2px solid #b8b8b8",
  boxShadow: 24,
  p: 2,
  borderRadius: "10px",
};

export default function Model({ content }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    width: "100%",
    zIndex: "50",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background:
      "linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))",
    color: "#107dea",
    cursor: "pointer",
    transition: "background 0.3s ease",
  };

  return (
    <div>
      <Button variant="contained" style={buttonStyle} onClick={handleOpen}>
        View Job
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}
            component="h2"
          >
            Job Description
          </Typography>
          <h6 style={{ color: "#000000", fontWeight: "500" }}>
            About Company:
          </h6>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, fontSize: "14px", opacity: "0.9" }}
          >
            {content ?? "No Description Provided"}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
