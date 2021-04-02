import React, { useState, useEffect } from "react";
import { viewGatepass } from "../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Loader from "../../../utils/Loader";
import useHeading from "../../Pages/useHeading";
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
const ViewGatepass = (id) => {
  useHeading("View Gatepass");
  const classes = useStyles();
  const [loading, setloading] = useState(false);
  const [Data, setData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    dispatch(viewGatepass(id.id)).then((res) => {
      if (res && res.data && res.data.success) {
        setData(res.data.data);
      }
      setloading(false);
    });
  }, [id, dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        (Data === null && (
          <>
            <div className="m-0 m-auto w-full">
              <Card className={classes.notfound}>GATEPASS NOT FOUND!!!</Card>
            </div>
          </>
        )) ||
        (Data !== null && (
          <Card className={classes.root}>
            <CardMedia
              className={classes.media}
              image={Data.photo}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Data.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                DATE : {Data.onDate}
                <br></br>
                TIME : {Data.onTime}
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
        ))
      )}
    </div>
  );
};

export default ViewGatepass;
