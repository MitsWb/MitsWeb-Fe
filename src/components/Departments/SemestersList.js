import React from "react";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, Typography } from "@material-ui/core";
import useHeading from "../Pages/Shared/useHeading";
import BackButton from "../buttons/BackButton";
import { A } from "hookrouter";

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

const SemestersList = ({ department }) => {
  const styles = useStyles();
  useHeading("Semesters");
  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];
  return (
    <>
      <BackButton />
      <Box className={styles.root}>
        {semesters.map((semester, key) => {
          return (
            <A key={key} href={`/departments/${department}/${semester}`}>
              <ListItem key={key} className={styles.items} button>
                <Typography className={styles.title}>{semester}</Typography>
              </ListItem>
            </A>
          );
        })}
      </Box>
    </>
  );
};

export default SemestersList;
