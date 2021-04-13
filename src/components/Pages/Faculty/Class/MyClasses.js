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
  { semester: "S1", department: "CSE" },
  { semester: "s2", department: "ME" },
  { semester: "s4", department: "EEE" },
  { semester: "s8", department: "CE" },
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
                <A href={`/class/${value.semester}-${value.department}`}>
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography>
                        {value.semester + " " + value.department}
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
