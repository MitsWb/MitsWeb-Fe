import React from "react";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useHeading from "../../useHeading";
import { A } from "hookrouter";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const myclasses = [
  { semester: "1", department: "CE" },
  { semester: "2", department: "ME" },
  { semester: "3", department: "EEE" },
  { semester: "8", department: "CSE", subjectCode: "cs100" },
];
function MyClasses() {
  useHeading("My classes");
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        {myclasses.map((value, key) => {
          return (
            <>
              <Grid item xs={6} sm={3}>
                <A
                  href={`/class/S${value.semester}-${value.department}-${value.subjectCode}`}
                >
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography>
                        {"S" + value.semester + " " + value.department}
                      </Typography>
                    </CardContent>
                  </Card>
                </A>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}

export default MyClasses;
