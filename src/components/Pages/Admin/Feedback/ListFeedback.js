import React from "react";

import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    top: theme.spacing(15),
    left: theme.spacing(35),
  },
}));

const ListFeedback = ({ types }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        {types.map((value, key) => {
          return (
            <>
              <Grid key={key} item xs={12} sm={3}>
                <Card className={classes.paper}>
                  <CardContent>
                    <Typography className="truncate">
                      {value.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
};

export default ListFeedback;
