import React, { useEffect, useState } from "react";
import { Grid, Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useHeading from "../../useHeading";
import { A } from "hookrouter";
import { getClass } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Loader } from "../../../../utils";
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

function MyClasses() {
  useHeading("My classes");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [myclasses, setmyclasses] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getClass()).then((res) => {
      if (res && res.data && res.data.success) {
        setmyclasses(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : myclasses.length === 0 ? (
        <>No classes found</>
      ) : (
        <Grid container spacing={3}>
          {myclasses.map((value, key) => {
            return (
              <>
                <Grid key={key} item xs={6} sm={3}>
                  <A
                    href={`/class/S${value.semester}-${value.department}-${value.code}`}
                  >
                    <Card className={classes.paper}>
                      <CardContent>
                        <Typography>
                          {"S" +
                            value.semester +
                            " " +
                            value.department +
                            " " +
                            value.code}
                        </Typography>
                      </CardContent>
                    </Card>
                  </A>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default MyClasses;
