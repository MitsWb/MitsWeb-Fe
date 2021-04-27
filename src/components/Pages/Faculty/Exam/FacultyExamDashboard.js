import React, { useEffect, useState } from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../Shared/useHeading";
import { getExamTypes } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { A } from "hookrouter";
import { Loader } from "../../../../utils";
import BackButton from "../../../buttons/BackButton";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 5,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const FacultyExamDashboard = () => {
  useHeading("Exam");
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const [examtypes, setexamtypes] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    dispatch(getExamTypes()).then((res) => {
      if (res && res.data && res.data.success) {
        setexamtypes(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch]);
  return (
    <>
      <BackButton />
      <Addbutton title={"Add Exams"} href={"/exam/create"} />
      {loading ? (
        <Loader msg={"Loading exam types"} />
      ) : (
        <Grid container spacing={3}>
          {examtypes.map((value, key) => {
            return (
              <Grid key={key} item xs={6} sm={3}>
                <A href={`/exam/${value._id}`}>
                  <Card className={classes.paper}>
                    <CardContent>
                      <Typography>{value.type}</Typography>
                    </CardContent>
                  </Card>
                </A>
              </Grid>
            );
          })}
        </Grid>
      )}{" "}
    </>
  );
};

export default FacultyExamDashboard;
