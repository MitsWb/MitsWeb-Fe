import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  value: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ Data }) {
  const classes = useStyles();
  console.log(Data);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Semester And Department
      </Typography>
      <ListItem className={classes.listItem}>
        <ListItemText primary="Department" />
        <Typography variant="subtitle1" className={classes.value}>
          {Data &&
            Data.semesterDepartment &&
            Data.semesterDepartment.department}
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <ListItemText primary="Semester" />
        <Typography variant="subtitle1" className={classes.value}>
          {Data && Data.semesterDepartment && Data.semesterDepartment.semester}
        </Typography>
      </ListItem>
      <Typography variant="h6" gutterBottom>
        Period Timings
      </Typography>
      <List disablePadding>
        {Data.periodTimings.map((weekday) => (
          <>
            <Typography
              variant="subtitle1"
              className={classes.value}
              color={"secondary"}
              style={{
                fontWeight: 200,
                textDecoration: "underline",
              }}
            >
              {weekday.day}
            </Typography>
            {weekday.timings.map((period) => (
              <ListItem className={classes.listItem} key={period.subject}>
                <ListItemText
                  primary={`${moment(period.startTime).format("h:mm a")}
                            -${moment(period.endTime).format("h:mm a")}`}
                />
                <Typography variant="subtitle1" className={classes.value}>
                  {period.subject}
                </Typography>
              </ListItem>
            ))}
          </>
        ))}
      </List>
      <hr />
    </React.Fragment>
  );
}
