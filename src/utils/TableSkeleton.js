import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
const TableSkeleton = () => {
  return (
    <>
      <Typography variant="h1">
        <Skeleton animation="wave" />
      </Typography>
      <Typography component="div" variant="body1">
        <Skeleton animation="wave" />
      </Typography>
      <Typography component="div" variant="body1">
        <Skeleton animation="wave" />
      </Typography>
      <Typography component="div" variant="body1">
        <Skeleton animation="wave" />
      </Typography>
    </>
  );
};

export default TableSkeleton;
