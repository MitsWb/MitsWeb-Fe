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
  const timeConverter = (time) => {
    if (time) {
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? " AM" : " PM";
        time[0] = +time[0] % 12 || 12;
      }
      return time.join("");
    } else return null;
  };
  const dateConverter = (date) => {
    if (date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const DATE = date.split("-");
      const finalDate =
        DATE[2] + " " + months[Number(DATE[1]) - 1] + " " + DATE[0];
      return finalDate;
    } else {
      return null;
    }
  };
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
            TYPE : {data.type === "halfDay" ? "Half Day" : "Full Day"}
            <br></br>
            REASON : {data.description}
            <br></br>
            CLASS : {"Year " + data.currentYear + " " + data.department}
            {data.type === "fullDay" ? (
              <>
                {" "}
                <p>
                  <span className="bold mr-2">From date:</span>
                  {dateConverter(data.date)}
                </p>
                <p>
                  <span className="bold mr-2">To Date:</span>
                  {dateConverter(data.toDate)}
                </p>
              </>
            ) : (
              <>
                {" "}
                <p>
                  <span className="bold mr-2">From time:</span>
                  {timeConverter(data.fromTime)}
                </p>
                <p>
                  <span className="bold mr-2">To time:</span>
                  {timeConverter(data.toTime)}
                </p>
              </>
            )}
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
