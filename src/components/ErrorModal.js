import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const ErrorModal = ({ openError, setOpenError, error }) => {
  return (
    <Modal
      open={openError}
      onClose={() => setOpenError(false)}
      aria-labelledby="Error"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid red",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          ERROR:
        </Typography>
        <Typography sx={{ mt: 2 }}>{error}</Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenError(false)}
          sx={{ mt: 2 }}
        >
          U redu
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
