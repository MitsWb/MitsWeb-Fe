import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CardSkeleton } from "../../../../utils";
import { getFeebbackCategory } from "../../../../redux/apiActions";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
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

const ViewFeedbacks = () => {
  const classes = useStyles();
  const [types, settypes] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    dispatch(getFeebbackCategory()).then((res) => {
      if (res && res.data && res.data.success) {
        settypes(res.data.data || []);
      }
      setloading(false);
    });
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <>
          <CardSkeleton xs={12} height={80} />
        </>
      ) : (
        <>
          <Grid container spacing={3}>
            {types.map((value, key) => {
              return (
                <>
                  <Grid key={key} item xs={12} sm={3}>
                    <Link to={"/feedbacktype/" + value._id}>
                      <Card className={classes.paper}>
                        <CardContent>
                          <Typography className="truncate">
                            {value.category}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};

export default ViewFeedbacks;
