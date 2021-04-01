import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default function ConfirmationBox({
  open,
  handleClose,
  data,
  handleConfirm,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          APPROVE/REJECT GATEPASS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <span className="bold truncate ">
              {" "}
              {data.name} {" ("}
              {data.email}
              {")"}
            </span>
            <br></br>
            <span className="bold truncate ">
              STATUS :{" "}
              {data.status === 0
                ? "PENDING"
                : data.status === -1
                ? "REJECTED"
                : "APPROVED"}
              <br></br>
            </span>
            REASON : {data.description}
            <p>
              <span className="bold mr-2">Date:</span>
              {data.onDate}
            </p>
            <p>
              <span className="bold mr-2">Time:</span>
              {data.onTime}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => handleConfirm(-1)}
            color="secondary"
          >
            REJECT
          </Button>
          <ThemeProvider theme={theme}>
            <Button
              onClick={() => handleConfirm(1)}
              variant="contained"
              color="primary"
            >
              APPROVE
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
