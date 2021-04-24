import React from "react";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { useJupiterListItemStyles } from "@mui-treasury/styles/listItem/jupiter";
import { makeStyles, Typography } from "@material-ui/core";
import useHeading from "../Pages/Shared/useHeading";
import BackButton from "../buttons/BackButton";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    width: "100%",
    [breakpoints.up("lg")]: {
      marginTop: 40,
    },
  },
  items: {
    margin: "10px",
    color: "#1769aa",
  },
  title: {
    fontFamily: "Keania One",
    fontSize: "2rem",
    textTransform: "uppercase",
  },
}));

const SemestersList = () => {
  const classes = useJupiterListItemStyles();
  const styles = useStyles();
  useHeading("Semesters");
  return (
    <>
      <BackButton />
      <Box className={styles.root}>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S1</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S2</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S3</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S4</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S5</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S6</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S7</Typography>
        </ListItem>
        <ListItem classes={classes} className={styles.items} button>
          <Typography className={styles.title}>S8</Typography>
        </ListItem>
      </Box>
    </>
  );
};

export default SemestersList;
