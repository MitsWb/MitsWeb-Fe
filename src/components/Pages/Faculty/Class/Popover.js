import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const SimplePopover = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="secondary"
        onClick={handleClick}
        size="large"
      >
        <InfoIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ padding: "6px" }}
      >
        <Typography>Module: {data.module}</Typography>
        <Typography>Mode: {data.deliveryMode}</Typography>
        <Typography>Topic: {data.topic} </Typography>
      </Popover>
    </div>
  );
};
export default SimplePopover;
