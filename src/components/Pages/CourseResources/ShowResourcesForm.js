import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {},
}));

function ShowResourcesForm({ courses }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState({ index: "", show: false });

  const handleExpandClick = (index) => {
    setExpanded({ index: index, show: !expanded.show });
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: "2rem" }}>
        {courses.map((course, index) => {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={classes.avatar}
                      style={{
                        backgroundColor:
                          "#" + (((1 << 24) * Math.random()) | 0).toString(16),
                      }}
                    >
                      {course.type[0].toUpperCase()}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={course.subject.name.toUpperCase()}
                  subheader={`${course.department} S${course.semester}`}
                />
                <CardContent
                  style={{
                    display: "block",
                    transitionDuration: "0.3s",
                    height: "3rem",
                    marginBottom: "2px",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {course.topic}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]:
                        expanded.index === index && expanded.show,
                    })}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={expanded.index === index && expanded.show}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse
                  in={expanded.index === index && expanded.show}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    <Typography paragraph>{course.description}</Typography>
                    {course.resources.map((resource, index) => {
                      //to get the file name
                      let afterSlashChars = resource.url.match(
                        // eslint-disable-next-line
                        /\/([^\/]+)\/?$/
                      )[1];

                      return (
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{ margin: "2px" }}
                          key={index}
                        >
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {/* 36 is the length of unique id */}
                            {afterSlashChars.substr(36)}
                          </a>
                        </Button>
                      );
                    })}
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ShowResourcesForm;
