import React, { useEffect } from "react";
import Calendar from "color-calendar";
import "color-calendar/dist/css/theme-glass.css";
import { Card } from "@material-ui/core";
function Calender() {
  useEffect(() => {
    new Calendar({
      id: "#myCal",
      theme: "glass",
      weekdayType: "long-upper",
      monthDisplayType: "long",
      calendarSize: "large",
      headerBackgroundColor: "black",
      layoutModifiers: ["month-left-align"],
      eventsData: [
        {
          id: 1,
          name: "French class",
          start: "2021-05-01T06:00:00",
          end: "2021-05-01T20:30:00",
        },
        {
          id: 2,
          name: "Blockchain 101",
          start: "2020-08-20T10:00:00",
          end: "2020-08-20T11:30:00",
        },
      ],
      dateChanged: (currentDate, events) => {
        //    console.log("date change", currentDate, events);
      },
      monthChanged: (currentDate, events) => {
        //  console.log("month change", currentDate, events);
      },
    });
  }, []);
  return (
    <>
      <div className="w-full">
        <Card
          style={{ maxWidth: 450, padding: 10 }}
          className="bg-red-200 m-0 text-center m-auto"
        >
          <div id="myCal"></div>
        </Card>
      </div>
    </>
  );
}

export default Calender;
