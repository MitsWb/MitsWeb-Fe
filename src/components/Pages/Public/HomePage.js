import React, { useEffect, useState } from "react";
import useHeading from "../Shared/useHeading";
import { Grid, Typography, Card, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dimensions from "./Dimensions";
import Login from "./LoginPage";

const bannerImg = require("../../../assets/images/banner.svg");
const loginImg = require("../../../assets/images/login.svg");

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10px",
    padding: 10,
  },
  img: {
    maxWidth: "100%",
    maxHeight: "75%",
  },
  heading: {
    fontSize: 60,
    fontWeight: "bold",
  },
  banner: {
    alignItems: "center",
    marginTop: 5,
  },
  card: {
    paddingBottom: 50,
  },
  moto: {
    fontWeight: "semibold",
    fontSize: 18,
    fontStyle: "italic",
  },
  media: {
    // height: 180,
    backgroundImage: "url(" + loginImg + ")",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
  },
}));

const HomePage = () => {
  useHeading("Home");
  const { height, width } = Dimensions();
  const [dim, setdim] = useState({ height: height, width: width });
  useEffect(() => {
    setdim({ height: height, width: width });
  }, [height, width]);
  const classes = useStyles();
  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item alignItems="center" className={classes.banner} xs={12} sm={6}>
        <div>
          <img
            alt="newpic"
            style={{
              height: dim.height / 2,
              width: "auto",
            }}
            src={bannerImg}
          ></img>
          <div id="bannertitle" className="text-center">
            <Typography className={classes.heading}>MITS WEB</Typography>
            <Typography className={classes.moto}>
              "Online portal for mitsians"
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card className={classes.card}>
          <CardMedia className={classes.media}>
            <Login />
          </CardMedia>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomePage;
