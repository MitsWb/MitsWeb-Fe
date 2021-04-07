import React from "react";
import Color from "color";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { A } from "hookrouter";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
    },
  },
}));

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: ({ color }) => ({
    minWidth: 256,
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    fontFamily: "Keania One",
    fontSize: "2rem",
    color: "#fff",
    textTransform: "uppercase",
  },
}));

const CustomCard = ({ classes, image, title, department }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <A href={`/${department}/semesters`}>
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardMedia classes={mediaStyles} image={image} />
          <CardContent className={classes.content}>
            <Typography className={classes.title} variant={"h3"}>
              {title}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </A>
  );
};

export const DepartmentsList = React.memo(function DepartmentListCard() {
  const gridStyles = useGridStyles();
  const styles = useStyles({ color: "#203f52" });
  const styles2 = useStyles({ color: "#4d137f" });
  const styles3 = useStyles({ color: "#01579b" });
  const styles4 = useStyles({ color: "#34241e" });
  const styles5 = useStyles({ color: "#303f9f" });

  return (
    <>
      <Grid classes={gridStyles} container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            classes={styles}
            title={"Computer Science"}
            department={"cse"}
            image={"https://wallpapercave.com/wp/wp2700088.jpg"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            classes={styles2}
            title={"Mechanical"}
            department={"me"}
            image={"https://wallpapercave.com/wp/wp7717336.jpg"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            classes={styles3}
            title={"Electrical"}
            department={"eee"}
            image={"https://wallpapercave.com/wp/wp4341645.jpg"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            classes={styles4}
            title={"Electronics"}
            department={"ece"}
            image={"https://wallpapercave.com/wp/wp8489573.jpg"}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            classes={styles5}
            title={"Civil"}
            department={"ce"}
            image={"https://wallpapercave.com/wp/wp7117719.jpg"}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default DepartmentsList;
