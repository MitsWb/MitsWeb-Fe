import React from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import UseHeading from "./useHeading";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { A } from "hookrouter";
import BackButton from "../buttons/BackButton";

const useStyles = makeStyles({
  root: {
    margin: "0px auto",
    //   textAlign: "center",
    maxWidth: "500px",
  },
  media: {
    margin: "0px auto",
    height: "150px",
    marginTop: 10,
    width: "150px",
  },
  number: {
    fontSize: 18,
  },
  email: {
    fontSize: 15,
  },
  parent: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
});

const ProfilePage = () => {
  UseHeading("Profile");
  const classes = useStyles();
  const state = useSelector((reduxState) => reduxState);
  const currentUser = state.newapi.currentUser.data.data;
  const noImg =
    "https://cdn4.iconfinder.com/data/icons/jetflat-2-faces-2/60/005b_042_user_profile_avatar_man_boy_round-512.png";
  return (
    <>
      <BackButton />
      <Card className={classes.root}>
        <Avatar
          className={classes.media}
          src={currentUser.photo ? currentUser.photo : noImg}
        ></Avatar>
        <CardContent>
          <Typography
            className="text-center"
            gutterBottom
            variant="h5"
            component="h2"
          >
            {currentUser.name}
          </Typography>
          <Grid container spacing={2} className="text-center">
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom className="text-center lg:text-right">
                <PhoneIcon fontSize="small" /> {currentUser.number}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography gutterBottom className="text-center lg:text-left">
                {currentUser.email}
              </Typography>
            </Grid>
          </Grid>

          <Card className="p-1 bg-red-200">
            <CardContent>
              <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
                <Typography>
                  <span className={classes.title}>D.O.B : </span> 01-Jan-2001
                </Typography>
                <Typography>
                  <span className={classes.title}>Blood Group : </span> O+
                </Typography>
              </div>

              <Typography>
                <span className={classes.title}> Address :</span> Abc House,
                Edappally, Ernakulam, PIN : 635124
              </Typography>
              <br></br>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <Typography className={classes.parent}>
                      Details of Father :
                    </Typography>
                    <span className={classes.title}>Name :</span> Google
                    Assistant <br></br>
                    <span className={classes.title}>Mobile No : </span>
                    9874514878
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography>
                    <Typography className={classes.parent}>
                      Details of Mother :
                    </Typography>
                    <span className={classes.title}>Name :</span> Amazon Alexa
                    <br></br>
                    <span className={classes.title}>Mobile No : </span>
                    9854510124
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </CardContent>
        <CardActions>
          <A href="/updateprofile">
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ outline: "none" }}
            >
              Edit profile
            </Button>
          </A>
        </CardActions>
      </Card>
    </>
  );
};

export default ProfilePage;
