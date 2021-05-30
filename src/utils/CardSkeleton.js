import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
const CardSkeleton = ({ xs = 6, sm = 3, height = 100, animation = "wave" }) => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={xs} sm={sm}>
          <Skeleton animation={animation} height={height} variant="rect" />
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <Skeleton height={height} animation={animation} variant="rect" />
        </Grid>
        <Grid item xs={xs} sm={sm}>
          <Skeleton animation={animation} height={height} variant="rect" />
        </Grid>
        {sm === 3 && (
          <Grid item xs={xs} sm={sm}>
            <Skeleton height={height} animation={animation} variant="rect" />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CardSkeleton;
