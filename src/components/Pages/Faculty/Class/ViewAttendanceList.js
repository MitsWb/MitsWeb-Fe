import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAttendanceList } from "../../../../redux/apiActions";
import { Notify } from "../../../../utils";
const ViewAttendance = ({ className }) => {
  const classDetails = className.split("-");
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: "", type: "" });
  useEffect(() => {
    dispatch(
      getAttendanceList({
        semester: Number(classDetails[0][1]),
        department: classDetails[1].toUpperCase(),
        subjectCode: classDetails[2].toLowerCase(),
      })
    ).then((res) => {
      if (res && res.data && res.data.success) {
        console.log(res.data.data);
      } else if (res && res.data) {
        setnotify({ msg: res.data.msg || "Error", popup: true, type: "error" });
      }
    });
  }, [dispatch, classDetails]);
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="w-full text-center">Attendance List</div>
    </>
  );
};

export default ViewAttendance;
