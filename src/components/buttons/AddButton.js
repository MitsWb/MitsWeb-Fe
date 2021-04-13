import React from "react";
import { Button } from "@material-ui/core";
import { A } from "hookrouter";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Addbutton = ({ title, href }) => {
  return (
    <div className="w-full text-center pb-2">
      <A href={href}>
        <Button
          className="mb-2"
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          {title}
        </Button>
      </A>
    </div>
  );
};
export default Addbutton;
