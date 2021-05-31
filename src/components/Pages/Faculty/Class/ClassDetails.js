import React from "react";
import {
  Grid,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
} from "@material-ui/core";
function ClassDetails({ details, handleChange }) {
  return (
    <>
      <div className="w-full">
        <div>
          <Card
            style={{
              padding: "10px 10px 20px 10px",
              maxWidth: "400px",
              margin: "0px auto",
            }}
          >
            <Grid container xs={6} sm={12} spacing={2}>
              <Grid item>
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "150px", margin: 5 }}
                >
                  <InputLabel>Module</InputLabel>
                  <Select
                    value={details.module}
                    onChange={handleChange}
                    label="Module"
                    name="module"
                  >
                    <MenuItem disabled value={"none"}>
                      None
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4 </MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl
                  variant="outlined"
                  style={{ minWidth: "150px", margin: 5 }}
                >
                  <InputLabel>Delivery Mode</InputLabel>
                  <Select
                    value={details.deliveryMode}
                    onChange={handleChange}
                    label="Delivery Mode"
                    name="deliveryMode"
                  >
                    <MenuItem value={"offline"}>Offline</MenuItem>
                    <MenuItem value={"online"}>Online</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <TextField
                label="Topic"
                name="topic"
                value={details.topic}
                onChange={handleChange}
                variant="outlined"
                style={{ minWidth: "300px", margin: "0px auto" }}
              />
            </Grid>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ClassDetails;
