import React, { useState, useEffect } from "react";
import Back from "../../../buttons/BackButton";
import useHeading from "../../Shared/useHeading";
import { makeStyles } from "@material-ui/core/styles";
import { CardSkeleton, Notify } from "../../../../utils";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { A } from "hookrouter";
import { useDispatch } from "react-redux";
import { getFeedbackQuestions } from "../../../../redux/apiActions";

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
const ViewCategory = ({ _id }) => {
  useHeading("View Category");
  const classes = useStyles();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const teachers = [
    { name: "abc", subject: "cs100" },
    { name: "def", subject: "cs156" },
    { name: "abc", subject: "cs102" },
    { name: "abc", subject: "cs103" },
    { name: "abcs", subject: "c104" },
  ];
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    dispatch(getFeedbackQuestions(_id)).then((res) => {
      console.log(res.data.data);

      setloading(false);
    });
  }, [dispatch, _id]);
  return (
    <>
      <Back />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="sm:mt-0 md:mt-10 lg:mt-10">
        {loading ? (
          <CardSkeleton />
        ) : (
          <Grid container spacing={3}>
            {teachers.map((value, key) => {
              return (
                <Grid key={key} item xs={6} sm={3}>
                  <A
                    href="#"
                    // href={`/feedback/${value._id}`}
                  >
                    <Card className={classes.paper}>
                      <CardContent>
                        <Typography className="truncate">
                          {value.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </A>
                </Grid>
              );
            })}
          </Grid>
        )}
      </div>
    </>
  );
};

export default ViewCategory;
