import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { LinearProgress } from "@material-ui/core";
import EnterMarksDialog from "./EnterMarksDialog";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },

  title: {
    fontSize: 16,
  },
});

export default function SubjectExamsCard({ data }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleEnterMarksClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {data.subject.name}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {data.examType.type}
          </Typography>
          <Typography color="textSecondary">{data.date}</Typography>
        </CardContent>

        <LinearProgress color="secondary" />

        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setType("enter");
              setOpen(true);
            }}
          >
            Enter Marks
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setOpen(true);
              setType("view");
            }}
          >
            View Marks
          </Button>
        </CardActions>
      </Card>
      <EnterMarksDialog
        open={open}
        handleClose={handleEnterMarksClose}
        data={data}
        type={type}
      />
    </>
  );
}
