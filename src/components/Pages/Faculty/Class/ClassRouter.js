import React, { useState, useEffect } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import Steps from "./Steps";
import ViewAttendance from "./ViewAttendanceList";
import useHeading from "../../../Pages/Shared/useHeading";
import Drawer from "../../../Common/Drawer";
import Card from "@material-ui/core/Card";
import Backbutton from "../../../buttons/BackButton";

const ClassRouter = ({ className }) => {
  useHeading(`My Classes`);
  const classDetails = className.split("-");
  const [linkValid, setlinkValid] = useState(false);
  const semesters = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];
  const departments = ["ce", "me", "eee", "ece", "cse"];
  useEffect(() => {
    var validLink = false;
    if (
      classDetails.length === 3 &&
      semesters.find((e) => e === classDetails[0].toLowerCase()) &&
      departments.find((e) => e === classDetails[1].toLowerCase())
    ) {
      validLink = true;
    }
    setlinkValid(validLink);
    //eslint-disable-next-line
  }, []);

  const links = [
    { link: "/", title: "Home" },
    { link: "/attendancelist", title: "Attendance" },
  ];
  return (
    <>
      <Backbutton />
      <div className="sm:mt-0 md:mt-8 lg:mt-8">
        {!linkValid ? (
          <div className="w-full">
            <Card style={{ padding: 6, width: 200, margin: "0px auto" }}>
              Invalid Link!!!
            </Card>
          </div>
        ) : (
          <MemoryRouter>
            <Route
              exact
              path="/"
              component={() => (
                <Drawer page={<Steps className={className} />} links={links} />
              )}
            />
            <Route
              exact
              path="/attendancelist"
              component={() => (
                <Drawer
                  page={<ViewAttendance className={className} />}
                  links={links}
                />
              )}
            />
          </MemoryRouter>
        )}
      </div>
    </>
  );
};

export default ClassRouter;
