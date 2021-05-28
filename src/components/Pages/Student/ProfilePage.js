import React, { useEffect, useState } from "react";
import PhoneIcon from "@material-ui/icons/Phone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import UseHeading from "../Shared/useHeading";
import { Avatar } from "@material-ui/core";
import { A } from "hookrouter";
import BackButton from "../../buttons/BackButton";
import UploadProfileImage from "./UploadProfileImage";
import { getStudent } from "../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Notify } from "../../../utils";
import Skeleton from "@material-ui/lab/Skeleton";

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
  const initForm = {
    name: "",
    number: "",
    password: "",
    confirm: "",
    address: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    dob: "",
    bloodGroup: "",
  };
  const [currentUser, setCurrentUser] = useState(initForm);
  const [rerender, setrerender] = useState(false);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [loading, setloading] = useState(false);
  const noImg =
    "https://cdn4.iconfinder.com/data/icons/jetflat-2-faces-2/60/005b_042_user_profile_avatar_man_boy_round-512.png";
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    dispatch(getStudent()).then((res) => {
      if (res && res.data && res.data.success) {
        setCurrentUser(res.data.data);
      } else {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
  }, [dispatch, rerender]);
  const imageChanged = (res) => {
    setnotify({
      msg: res.data.msg,
      popup: true,
      type: res.data.success ? "success" : "error",
    });
    setrerender(!rerender);
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <BackButton />
      {loading ? (
        <>
          <Skeleton
            className={classes.root}
            animation="wave"
            height={500}
            variant="rect"
          />
          <div className="mt-2">
            {" "}
            <Skeleton
              className={classes.root}
              height={100}
              width={350}
              variant="rect"
              animation="wave"
            />
          </div>
        </>
      ) : (
        <>
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
                  <Typography
                    gutterBottom
                    className="text-center lg:text-right"
                  >
                    <PhoneIcon fontSize="small" /> {currentUser.mobile}
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
                      <span className={classes.title}>D.O.B : </span>{" "}
                      {currentUser.dob ? currentUser.dob : "EMPTY"}
                    </Typography>
                    <Typography>
                      <span className={classes.title}>Blood Group : </span>{" "}
                      {currentUser.bloodGroup
                        ? currentUser.bloodGroup
                        : "EMPTY"}
                    </Typography>
                  </div>

                  <Typography>
                    <span className={classes.title}> Address :</span>{" "}
                    {currentUser.address ? currentUser.address : "EMPTY"}
                  </Typography>
                  <br></br>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <Typography className={classes.parent}>
                          Details of Father :
                        </Typography>
                        <span className={classes.title}>Name :</span>{" "}
                        {currentUser.parentDetails
                          ? currentUser.parentDetails.father.name
                          : "EMPTY"}
                        <br></br>
                        <span className={classes.title}>Mobile No : </span>
                        {currentUser.parentDetails
                          ? currentUser.parentDetails.father.mobile
                          : "EMPTY"}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        <Typography className={classes.parent}>
                          Details of Mother :
                        </Typography>
                        <span className={classes.title}>Name :</span>{" "}
                        {currentUser.parentDetails
                          ? currentUser.parentDetails.mother.name
                          : "EMPTY"}
                        <br></br>
                        <span className={classes.title}>Mobile No : </span>
                        {currentUser.parentDetails
                          ? currentUser.parentDetails.mother.mobile
                          : "EMPTY"}
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
          <div className="w-full mt-2">
            <UploadProfileImage imageChanged={imageChanged} />
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePage;
