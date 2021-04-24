import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useHeading from "../../Pages/Shared/useHeading";
import moment from "moment";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "0px auto",
  },
  notfound: {
    maxWidth: 345,
    margin: "0px auto",
    textAlign: "center",
    fontSize: 25,
    padding: 10,
  },
  media: {
    height: 200,
    width: 200,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    borderRadius: "50%",
    margin: "0px auto",
    backgroundPosition: "50% 50%",
  },
});
const ViewGatepass = ({ data }) => {
  useHeading("View Gatepass");
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={data.photo}
          title="student image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            DATE : {moment(data.time).format("MMM Do YY")}
            <br></br>
            TIME : {moment(data.time).format("h:mm a")}
          </Typography>
          <Card
            style={{
              backgroundColor: "green",
              width: "50%",
              color: "white",
              textAlign: "center",
              padding: 2,
              marginTop: 4,
            }}
          >
            APPROVED
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewGatepass;
