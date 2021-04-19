import React, { useEffect } from "react";
import Addbutton from "../../../buttons/AddButton";
import useHeading from "../../useHeading";
import { useDispatch } from "react-redux";
import { getTimetable } from "../../../../redux/apiActions";
const TimetableDashboard = () => {
  useHeading("Timetable");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimetable()).then((res) => {
      if (res && res.data && res.data.success) {
        console.log(res.data.data);
      }
    });
  }, [dispatch]);
  return (
    <>
      <Addbutton title={"Add Timetable"} href={"/timetable/new"} />
    </>
  );
};

export default TimetableDashboard;
