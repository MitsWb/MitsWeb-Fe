import React, { useState, useEffect } from "react";
import Back from "../../../buttons/BackButton";
import useHeading from "../../Shared/useHeading";
import { makeStyles } from "@material-ui/core/styles";
import { CardSkeleton, Notify } from "../../../../utils";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
//import { getFeedbackQuestions } from "../../../../redux/apiActions";
import Addfeedback from "./Addfeedback";
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
  const [open, setopen] = useState(false);
  const [data, setdata] = useState("");
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const teachers = [
    { name: "abc", subject: "cs100", email: "abc@gmail.com" },
    { name: "def", subject: "cs156", email: "def@gmail.com" },
    { name: "abc", subject: "cs102", email: "ghi@gmail.com" },
    { name: "abc", subject: "cs103", email: "jkl@gmail.com" },
    { name: "abcs", subject: "c104", email: "mno@gmail.com" },
  ];
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(false);
    // dispatch(getFeedbackQuestions(_id)).then((res) => {
    //   console.log(res.data.data);

    //   setloading(false);
    // });
  }, [dispatch, _id]);
  return (
    <>
      <Back />
      <Addfeedback
        id={_id}
        open={open}
        handleClose={() => setopen(false)}
        data={data}
      />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="sm:mt-0 md:mt-10 lg:mt-10">
        {loading ? (
          <CardSkeleton />
        ) : (
          <Grid container spacing={3}>
            {teachers.map((value, key) => {
              return (
                <Grid
                  className="cursor-pointer"
                  onClick={() => {
                    setdata(value);
                    setopen(true);
                  }}
                  key={key}
                  item
                  xs={6}
                  sm={3}
                >
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography className="truncate">{value.name}</Typography>
                    </CardContent>
                  </Card>
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
