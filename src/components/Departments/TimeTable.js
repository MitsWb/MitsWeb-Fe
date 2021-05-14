import React, { useEffect, useState } from "react";
import { getClassTimetable } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
import Table from "./Table";
import { Notify } from "../../utils";
const TimeTable = ({ semester, department }) => {
  const dispatch = useDispatch();
  const [rows, setrows] = useState({ data: [], subjects: [] });
  const [notify, setnotify] = useState({ popup: false });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(
      getClassTimetable({ semester: Number(semester[1]), department })
    ).then((res) => {
      if (res && res.data && res.data.success) {
        setrows({ data: res.data.data, subjects: res.data.subjects });
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
        <h1>
          Time table of {semester} {department}{" "}
        </h1>
      </div>
      <Table rows={rows} loading={loading} />
    </>
  );
};

export default TimeTable;
