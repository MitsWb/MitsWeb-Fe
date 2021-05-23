import React, { useEffect, useState } from "react";
import useHeading from "../../Shared/useHeading";
import { useDispatch } from "react-redux";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { getFeebbackCategory } from "../../../../redux/apiActions";
import { makeStyles } from "@material-ui/core/styles";
import { CardSkeleton, Notify } from "../../../../utils";

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

const Feedback = () => {
  useHeading("Feedback");
  const [loading, setloading] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    setloading(true);
    dispatch(getFeebbackCategory("student")).then((res) => {
      if (res && res.data && res.data.success) {
        setcategories(res.data.data);
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
  }, [dispatch]);
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <CardSkeleton />
      ) : (
        <Grid container spacing={3}>
          {categories.map((value, key) => {
            return (
              <Grid key={key} item xs={6} sm={3}>
                <A href={`/feedback/${value._id}`}>
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography className="truncate">
                        {value.category}
                      </Typography>
                    </CardContent>
                  </Card>
                </A>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Feedback;
