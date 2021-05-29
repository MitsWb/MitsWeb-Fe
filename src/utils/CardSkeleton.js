import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
const CardSkeleton = ({ xs = 6, height = 100, animation = "wave" }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={xs} sm={3}>
          <Skeleton animation={animation} height={height} variant="rect" />
        </Grid>
        <Grid item xs={xs} sm={3}>
          <Skeleton height={height} animation={animation} variant="rect" />
        </Grid>
        <Grid item xs={xs} sm={3}>
          <Skeleton animation={animation} height={height} variant="rect" />
        </Grid>
        <Grid item xs={xs} sm={3}>
          <Skeleton height={height} animation={animation} variant="rect" />
        </Grid>
      </Grid>
    </>
  );
};

export default CardSkeleton;
