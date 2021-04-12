import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import moment from "moment";
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
          APPROVE/REJECT LEAVE
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
            REASON : {data.description}
            <br></br>
            CLASS : {"Year " + data.currentYear + " " + data.department}
            <p>
              <span className="bold mr-2">from Date:</span>
              {moment(data.fromTimestamp).format("MMM Do YY")}
            </p>
            <p>
              <span className="bold mr-2">Time:</span>
              {moment(data.toTimestamp).format("MMM Do YY")}
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
