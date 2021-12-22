import React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

const SuccessModal = ({ openSuccess, setOpenSuccess }) => {
  return (
    <Modal
      open={openSuccess}
      onClose={() => setOpenSuccess(false)}
      aria-labelledby="Success"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid rgb(46, 125, 50)",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Success:
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Uspesno napravljen upitnik!
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpenSuccess(false)}
          sx={{ mt: 2 }}
        >
          U redu
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
