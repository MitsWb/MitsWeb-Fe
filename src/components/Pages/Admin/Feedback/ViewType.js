import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  validFeedbackType,
  getFeebbackList,
} from "../../../../redux/apiActions";
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
  Typography,
} from "@material-ui/core";
const ViewType = (props) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [category, setcategory] = useState("");
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [loading, setLoading] = useState(false);
  const [details, setdetails] = useState({ currentYear: 1, department: "CE" });
  useEffect(() => {
    setLoading(true);
    dispatch(validFeedbackType(id || "id")).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setcategory(res.data.data.category);
        } else {
          setnotify({
            msg: res.data.msg,
            popup: true,
            type: "error",
          });
        }
      }
      setLoading(false);
    });
  }, [dispatch, id]);
  const getRemarks = (arr) => {
    const value = {
      belowaverage: 1,
      average: 2,
      good: 3,
      verygood: 4,
      excellent: 5,
    };
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += value[arr[i]];
    }
    return sum / arr.length;
  };
  const processObj = (Obj) => {
    const keys = Object.keys(Obj);
    let retArr = [];
    for (let i = 0; i < keys.length; i++) {
      const ans = Obj[keys[i]];
      const answer = ans.slice(1);
      retArr = retArr.concat({
        question: ans[0],
        answer,
        remarks: getRemarks(answer),
      });
    }
    return retArr;
  };
  const handleSubmit = () => {
    const { currentYear, department } = details;
    dispatch(getFeebbackList(id, { currentYear, department })).then((res) => {
      if (res && res.data) {
        const result = res.data.data;
        // const finalArr = [];
        for (let i = 0; i < result.length; i++) {
          const key = Object.keys(result[i]);
          const keyArr = key[0].split("--");
          const answerArr = processObj(result[i][key[0]]);

          const data = {
            faculty: keyArr[0],
            subject: keyArr[1],
            feedbackList: answerArr,
          };
          console.log(data);
        }
      }
      //  console.log(res.data.data);
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full">
            <Card
              className="truncate"
              style={{
                maxWidth: 200,
                margin: "0px auto",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              <Typography variant="h5 ">{category}</Typography>
            </Card>
            <br></br>
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
                    onClick={handleSubmit}
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
