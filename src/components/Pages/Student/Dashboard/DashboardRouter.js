import React, { useEffect, useState } from "react";
import { MemoryRouter, Route } from "react-router-dom";
import useHeading from "../../Shared/useHeading";
import { getStudentTimetable } from "../../../../redux/apiActions";
import Drawer from "../../../Common/Drawer";
import Dashboard from "./Dashboard";
import Timetable from "./TimeTable";
import { useDispatch } from "react-redux";
import { Notify, Loader } from "../../../../utils";
const DashbpardRoute = () => {
  useHeading(`Class Dashboard`);
  const [rows, setrows] = useState([]);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getStudentTimetable()).then((res) => {
      if (res && res.data && res.data.success) {
        setrows(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch]);
  const links = [
    { link: "/", title: "Home" },
    { link: "/timetable", title: "Timetable" },
  ];

  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      {loading ? (
        <Loader msg="loading dashboard" />
      ) : (
        <MemoryRouter>
          <Route
            exact
            path="/"
            // component={() => <Drawer page={<Dashboard />} links={links} />}
            component={() => <Dashboard links={links} />}
          />
          <Route
            exact
            path="/timetable"
            component={() => (
              <Drawer page={<Timetable rows={rows} />} links={links} />
            )}
          />
        </MemoryRouter>
      )}
    </>
  );
};

export default DashbpardRoute;
