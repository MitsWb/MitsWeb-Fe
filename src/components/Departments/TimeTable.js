import React, { useEffect } from "react";
import { getClassTimetable } from "../../redux/apiActions";
import { useDispatch } from "react-redux";
const TimeTable = ({ semester, department }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getClassTimetable({ semester: Number(semester[1]), department })
    ).then((res) => {
      console.log(res);
    });
  }, [dispatch, semester, department]);
  return (
    <>
      <div className="w-full text-center">
        <div>
          This is timetale of s{semester} {department}{" "}
        </div>
      </div>
    </>
  );
};

export default TimeTable;
