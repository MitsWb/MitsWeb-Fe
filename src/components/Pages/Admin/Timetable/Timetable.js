import React, { useEffect, useState } from "react";
import { getTimetablebyID } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import Table from "./Table";
import { Notify } from "../../../../utils";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Back from "../../../buttons/BackButton";
const TimeTable = ({ _id }) => {
  const dispatch = useDispatch();
  const [rows, setrows] = useState([]);
  const [notify, setnotify] = useState({ popup: false });
  const [loading, setloading] = useState(false);
  const [Class, setclass] = useState({ department: "", semester: "" });
  useEffect(() => {
    setloading(true);
    dispatch(getTimetablebyID(_id)).then((res) => {
      if (res && res.data && res.data.success) {
        const { semester, department, periodTimings } = res.data.data;
        setrows(periodTimings);
        setclass({ semester, department });
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg, popup: true, type: "error" });
      }
      setloading(false);
    });
  }, [dispatch, _id]);
  return (
    <>
      <Back />
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="mt-6">
        <div className="w-full text-center p-4 text-xl">
          {loading ? (
            <Typography variant="div">
              <Skeleton animation="wave" />
            </Typography>
          ) : (
            <h1>
              {Class.semester
                ? "Time table of S" + Class.semester + Class.department
                : "Timetable not found"}
            </h1>
          )}
        </div>
        <Table rows={rows} loading={loading} />
      </div>
    </>
  );
};

export default TimeTable;
