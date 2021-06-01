import React, { useState } from "react";
import events from "./Events";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Dimensions from "../../Pages/Shared/Dimensions";
const localizer = momentLocalizer(moment);

const propTypes = {};

const EventsCalendar = ({ selectable }) => {
  const [event, setEvent] = useState(events);
  const { height } = Dimensions();

  function handleSelect({ start, end }) {
    const title = window.prompt("New event name");
    if (title) {
      setEvent([...event, { start: start, end: end, title: title }]);
    }
  }
  return (
    <>
      <div style={{ height: height - 200 }}>
        <Calendar
          selectable={selectable}
          localizer={localizer}
          events={event}
          defaultView={Views.MONTH}
          defaultDate={new Date()}
          onSelectEvent={(event) => alert(event.title)}
          onSelectSlot={handleSelect}
        />
      </div>
    </>
  );
};

EventsCalendar.propTypes = propTypes;

export default EventsCalendar;
