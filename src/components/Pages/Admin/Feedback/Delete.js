import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
const Delete = ({ open, handleClose, handleDelete, data }) => {
  return (
    <Dialog className="p-6" open={open} onClose={handleClose}>
      <DialogTitle>You are about to delete {data.category} !</DialogTitle>
      <DialogActions>
        <Button
          style={{ outline: "none" }}
          onClick={handleClose}
          variant="contained"
          color="default"
          size="small"
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ outline: "none" }}
          onClick={handleDelete}
          size="small"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Delete;
