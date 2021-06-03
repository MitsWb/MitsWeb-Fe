import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
const Delete = ({ open, handleClose, handleDelete, data }) => {
  return (
    <Dialog className="p-6" open={open} onClose={handleClose}>
      <DialogTitle>DELETE</DialogTitle>
      <DialogContent>You are about to delete {data.category} !</DialogContent>
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
