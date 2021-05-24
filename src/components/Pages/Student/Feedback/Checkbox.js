import React from "react";
import Radio from "@material-ui/core/Radio";
import { FormControlLabel } from "@material-ui/core";

export default function RadioButtons({ checkChange }) {
  const [selectedValue, setSelectedValue] = React.useState("good");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    checkChange(event.target.value);
  };

  return (
    <div className="text-xs flex overflow-x-auto ">
      <FormControlLabel
        value="bottom"
        control={
          <Radio
            checked={selectedValue === "belowaverage"}
            onChange={handleChange}
            value="belowaverage"
            name="radio-button-demo"
            color="primary"
            size="small"
            inputProps={{ "aria-label": "belowaverage" }}
          />
        }
        label="B Avg"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="bottom"
        control={
          <Radio
            checked={selectedValue === "average"}
            onChange={handleChange}
            value="average"
            name="radio-button-demo"
            size="small"
            inputProps={{ "aria-label": "average" }}
            color="secondary"
          />
        }
        label="Avg"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="bottom"
        control={
          <Radio
            checked={selectedValue === "good"}
            onChange={handleChange}
            value="good"
            name="radio-button-demo"
            size="small"
            inputProps={{ "aria-label": "good" }}
            color="primary"
          />
        }
        label="Good"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="bottom"
        control={
          <Radio
            checked={selectedValue === "verygood"}
            onChange={handleChange}
            value="verygood"
            color="secondary"
            name="radio-button-demo"
            size="small"
            inputProps={{ "aria-label": "verygood" }}
          />
        }
        label="V Good"
        labelPlacement="bottom"
      />
      <FormControlLabel
        value="bottom"
        control={
          <Radio
            checked={selectedValue === "excellent"}
            onChange={handleChange}
            value="excellent"
            color="primary"
            name="radio-button-demo"
            size="small"
            inputProps={{ "aria-label": "excellent" }}
          />
        }
        label="Excellent"
        labelPlacement="bottom"
      />
    </div>
  );
}
