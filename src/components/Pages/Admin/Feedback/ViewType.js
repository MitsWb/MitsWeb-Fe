import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { validFeedbackType } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Notify, Loader } from "../../../../utils";
import {
  Grid,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@material-ui/core";
const ViewType = (props) => {
  const location = useLocation();
  const _id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [loading, setLoading] = useState(false);
  const [details, setdetails] = useState({ currentYear: 1, department: "CE" });
  useEffect(() => {
    setLoading(true);
    dispatch(validFeedbackType(_id || "id")).then((res) => {
      if (res && res.data) {
        setnotify({
          msg: res.data.msg,
          popup: !res.data.success,
          type: "error",
        });
      }
      setLoading(false);
    });
  }, [dispatch, _id]);
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full">
            <Card style={{ maxWidth: 400, margin: "0px auto", padding: 5 }}>
              <Grid container xs={6} sm={12} spacing={2}>
                <Grid item>
                  <Grid
                    style={{ width: "300px" }}
                    container
                    spacing={2}
                    alignItems="center"
                    justify="center"
                    direction="row"
                  >
                    <Grid item>
                      <FormControl variant="outlined" style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-outlined-label">
                          Current year
                        </InputLabel>
                        <Select
                          value={details.currentYear}
                          onChange={(e) =>
                            setdetails({
                              ...details,
                              currentYear: e.target.value,
                            })
                          }
                          label="Current year"
                        >
                          <MenuItem value={1}>First</MenuItem>
                          <MenuItem value={2}>Second</MenuItem>
                          <MenuItem value={3}>Third</MenuItem>
                          <MenuItem value={4}>Fourth</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl variant="outlined" style={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-outlined-label">
                          Department
                        </InputLabel>
                        <Select
                          value={details.department}
                          onChange={(e) =>
                            setdetails({
                              ...details,
                              department: e.target.value,
                            })
                          }
                          label="Current year"
                        >
                          <MenuItem value={"CE"}>CE</MenuItem>
                          <MenuItem value={"ME"}>ME</MenuItem>
                          <MenuItem value={"EEE"}>EEE</MenuItem>
                          <MenuItem value={"ECE"}>ECE</MenuItem>
                          <MenuItem value={"CSE"}>CSE</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid alignItems="center" justify="center" direction="row" item>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    style={{ outline: "none" }}
                  >
                    Find
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default ViewType;
