import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function Checkboxes({ data, handleCheckbox }) {
  return (
    <div>
      <FormControlLabel
        value="top"
        control={
          <Checkbox
            checked={data.y1 === "true" ? true : false}
            name="y1"
            value={data.y1}
            color="secondary"
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="1"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="top"
        control={
          <Checkbox
            checked={data.y2 === "true" ? true : false}
            onChange={handleCheckbox}
            color="primary"
            name="y2"
            value={data.y2}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="2"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="top"
        control={
          <Checkbox
            checked={data.y3 === "true" ? true : false}
            color="secondary"
            onChange={handleCheckbox}
            name="y3"
            value={data.y3}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="3"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="top"
        control={
          <Checkbox
            checked={data.y4 === "true" ? true : false}
            color="primary"
            name="y4"
            value={data.y4}
            onChange={handleCheckbox}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
        label="4"
        labelPlacement="bottom"
      />
    </div>
  );
}
