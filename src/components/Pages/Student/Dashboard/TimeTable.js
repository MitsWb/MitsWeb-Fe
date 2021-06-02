import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStudentTimetable } from "../../../../redux/apiActions";
import { Loader } from "../../../../utils";
import Table from "./Table";
const TimeTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setloading(true);
    dispatch(getStudentTimetable()).then((res) => {
      if (res && res.data && res.data.success) {
        setRows(res.data.data);
      }
      setloading(false);
    });
  }, [dispatch]);

  return (
    <>
      {loading && <Loader msg="loading" />}
      <div className="w-full text-center">
        <h1>Timetable</h1>
      </div>
      <Table rows={rows} loading={loading} />
    </>
  );
};

export default TimeTable;
