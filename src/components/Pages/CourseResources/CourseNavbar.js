import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import useHeading from "../Shared/useHeading";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Typography } from "@material-ui/core";
import ShowResources from "./ShowResources";
import UploadResources from "./UploadResources";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));

export default function CourseNavbar() {
  const classes = useStyles();
  useHeading("Course Resources");
  const [uploadNew, setUploadNew] = useState(false);
  const [showResources, setShowResources] = useState(true);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color={showResources ? "primary" : "inherit"}
          href="/course/new"
          onClick={(e) => {
            e.preventDefault();
            setUploadNew(false);
            setShowResources(true);
          }}
          className={classes.link}
          name="show"
        >
          <CloudDoneIcon className={classes.icon} />
          <Typography
            style={{ textDecoration: showResources ? "underline" : null }}
          >
            All Uploads
          </Typography>
        </Link>
        <Link
          color={uploadNew ? "primary" : "inherit"}
          onClick={(e) => {
            e.preventDefault();
            setUploadNew(true);
            setShowResources(false);
          }}
          className={classes.link}
          name="upload"
        >
          <CloudUploadIcon className={classes.icon} />
          <Typography
            style={{ textDecoration: uploadNew ? "underline" : null }}
          >
            Upload New
          </Typography>
        </Link>
      </Breadcrumbs>
      {showResources ? <ShowResources /> : null}
      {uploadNew ? <UploadResources /> : null}
    </>
  );
}
