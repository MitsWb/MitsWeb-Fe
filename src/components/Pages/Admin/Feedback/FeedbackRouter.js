import React /*, { useState, useEffect } */ from "react";
import { MemoryRouter, Route } from "react-router-dom";
import FeebBack from "./Feedback";
import useHeading from "../../Shared/useHeading";
import Drawer from "../../../Common/Drawer";

const FeedbackRouter = () => {
  useHeading(`Feedbacks`);

  const links = [
    { link: "/", title: "Types" },
    { link: "/test", title: "Test" },
  ];
  return (
    <>
      <MemoryRouter>
        <Route
          exact
          path="/test"
          component={() => <Drawer page={<>test</>} links={links} />}
        />
        <Route
          exact
          path="/"
          component={() => <Drawer page={<FeebBack />} links={links} />}
        />
      </MemoryRouter>
    </>
  );
};

export default FeedbackRouter;
