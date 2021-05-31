import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Popover from "./Popover";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EnterMarksDialog({ open, handleClose, data, list }) {
  const classes = useStyles();

  return (
    <>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Grid
                container
                alignItems="center"
                justify="center"
                direction="row"
                spacing={0}
              >
                <Grid item xs={12} sm={6}>
                  <div className="flex flex-row">
                    <div className="truncate mr-2">
                      <Typography>{`${data.startTime}-${data.endTime}`}</Typography>
                    </div>
                    <div className="truncate ml-2 mr-2">
                      <Typography> {data.timeStamp}</Typography>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="ml-2">
                    <Popover data={data} />
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div style={{ marginTop: "60px" }}>
            {list.map((value, index) => {
              return (
                <div
                  style={{
                    height: "200",
                    marginTop: "6px",
                    marginBottom: "6px",
                  }}
                >
                  <Card
                    key={index}
                    style={{
                      margin: "0px auto",
                      minWidth: "300px ",
                      maxWidth: "500px",
                    }}
                  >
                    <CardContent>
                      <div className="flex relative flex-row">
                        <div className="w-4/5">
                          <Grid style={{ width: "100%" }} container spacing={2}>
                            <Grid item xs={6} sm={12}>
                              <div className="truncate">
                                <Typography> {value.studentId}</Typography>
                              </div>
                            </Grid>
                            <Grid item xs={6} sm={12}>
                              <div className="truncate">
                                <Typography> {value.name}</Typography>
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                        <div className="w-1/5">
                          <Card
                            style={{
                              height: 30,
                              width: 30,
                              backgroundColor:
                                value.present === "true" ? "green" : "red",
                            }}
                          ></Card>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </Dialog>
      </div>
    </>
  );
}
