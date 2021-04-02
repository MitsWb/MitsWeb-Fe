import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import QRCode from "react-qr-code";
export default function Qrcode({ open, handleClose, link }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          style={{ backgroundColor: "white", text: "black" }}
          id="responsive-dialog-title"
        >
          <p className="text-black"> SCAN TO CONFIRM</p>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "white" }}>
          <DialogContentText>
            <QRCode size="200" value={link} />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "white" }}>
          <Button
            style={{ outline: "none" }}
            onClick={handleClose}
            color="primary"
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
