import React /*, { useState, useEffect } */ from "react";
import { MemoryRouter, Route } from "react-router-dom";
import FeebBack from "./Feedback";
import useHeading from "../../Shared/useHeading";
import Drawer from "../../../Common/Drawer";
import ViewType from "./ViewType";
import ViewFeedback from "./ViewFeedbacks";
const FeedbackRouter = () => {
  useHeading(`Feedbacks`);

  const links = [
    { link: "/", title: "Home" },
    { link: "/feedbacktype", title: "Feedbacks" },
  ];
  return (
    <>
      <MemoryRouter>
        <Route
          exact
          path="/"
          component={() => <Drawer page={<FeebBack />} links={links} />}
        />
        <Route
          exact
          path="/feedbacktype"
          component={() => <Drawer page={<ViewFeedback />} links={links} />}
        />
        <Route
          exact
          path="/feedbacktype/:_id"
          component={() => <Drawer page={<ViewType />} links={links} />}
        />
      </MemoryRouter>
    </>
  );
};

export default FeedbackRouter;
