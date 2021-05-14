import React, { useEffect, useState } from "react";
import { getStudentTimetable } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import Table from "./Table";
import { Notify } from "../../../../utils";
const TimeTable = ({ semester, department }) => {
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const [notify, setnotify] = useState({ popup: false });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getStudentTimetable()).then((res) => {
      if (res && res.data && res.data.success) {
        setrows(res.data.data);
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
  }, [dispatch, semester, department]);
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="w-full text-center">
        <h1>Timetable</h1>
      </div>
      <Table rows={rows} loading={loading} />
    </>
  );
};

export default TimeTable;
