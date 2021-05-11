import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
const CardSkeleton = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Skeleton height={100} variant="rect" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Skeleton height={100} variant="rect" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Skeleton height={100} variant="rect" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <Skeleton height={100} variant="rect" />
        </Grid>
      </Grid>
    </>
  );
};

export default CardSkeleton;
