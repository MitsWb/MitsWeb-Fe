import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Button, CardActions, Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import FeedbackResponseModal from "./FeedbackResponseModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function ShowFeedbackResponse({ feedbacks }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [feedbackResp, setFeedbackResp] = useState([]);

  return (
    <>
      <FeedbackResponseModal
        open={open}
        feedbackResponse={feedbackResp}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Grid container spacing={2} style={{ marginTop: 2 }}>
        {feedbacks.map((feedback, index) => {
          let stars;
          let len = feedback.feedbackList.length;
          let remarksTotal = 0;
          let feedbackResponse = [];

          feedbackResponse = feedback.feedbackList.map((response, index) => {
            remarksTotal += response.remarks;
            return response;
          });
          stars = Number(remarksTotal) / len;

          return (
            <Grid item xs={12} sm={4}>
              <Card className={classes.root} key={index}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {feedback.faculty[0].toUpperCase()}
                    </Avatar>
                  }
                  title={feedback.subject.toUpperCase()}
                  subheader={feedback.faculty}
                />

                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Rating
                      defaultValue={stars}
                      getLabelText={(value) => customIcons[value].label}
                      IconContainerComponent={IconContainer}
                      readOnly
                    />
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      handleOpen();
                      setFeedbackResp(feedbackResponse);
                    }}
                  >
                    Show Responses
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default ShowFeedbackResponse;
