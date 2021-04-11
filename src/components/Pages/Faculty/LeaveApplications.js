import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLeaves } from "../../../redux/apiActions";
import useHeading from "../useHeading";

function LeaveApplications() {
  useHeading("Leaves");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLeaves()).then((res) => {
      console.log(res.data.data);
    });
  }, [dispatch]);

  return (
    <div>
      <div>Leave</div>
    </div>
  );
}

export default LeaveApplications;
