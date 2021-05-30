import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAttendanceList } from "../../../../redux/apiActions";
import { Notify, CardSkeleton } from "../../../../utils";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StudentList from "./StudentsList";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
}));
const ViewAttendance = ({ className }) => {
  const classDetails = className.split("-");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [list, setlist] = useState([]);
  const [data, setdata] = useState({ list: [], open: false, data: "" });
  const [notify, setnotify] = useState({ msg: "", popup: "", type: "" });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    dispatch(
      getAttendanceList({
        semester: Number(classDetails[0][1]),
        department: classDetails[1].toUpperCase(),
        subjectCode: classDetails[2].toLowerCase(),
      })
    ).then((res) => {
      if (res && res.data && res.data.success) {
        setlist(res.data.data);
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg || "Error", popup: true, type: "error" });
      }
      setloading(false);
    });
    // eslint-disable-next-line
  }, []);
  const handleClick = (e) => {
    setdata({ list: e.attendanceList, open: true, data: e });
  };
  return (
    <>
      <StudentList
        open={data.open}
        data={data.data}
        list={data.list}
        handleClose={() => setdata({ ...data, open: false })}
      />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <CardSkeleton height={120} />
      ) : (
        <Grid container spacing={3}>
          {list.map((value, key) => {
            return (
              <Grid key={key} item xs={6} sm={3}>
                <Card
                  onClick={() => handleClick(value)}
                  className={classes.paper}
                >
                  <CardContent>
                    <Typography>{value.timeStamp}</Typography>
                    <Typography>
                      {value.startTime + "-" + value.endTime}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default ViewAttendance;
