import { Container } from "@material-ui/core";
import React from "react";
import EventsCalendar from "../../../Features/Events/EventsCalendar";
const DashboardPage = () => {
  return (
    <>
      <Container maxWidth="xl">
        <EventsCalendar selectable={false} />
      </Container>
    </>
  );
};

export default DashboardPage;
