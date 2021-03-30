import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentFaculty } from "../../../redux/apiActions";
import useHeading from "../useHeading";
import GetGatePassRequests from "./GetGatePassRequests";

function ApproveRequests() {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState([]);
  useHeading("Approve Requests");
  useEffect(() => {
    setLoading(true);
    dispatch(getCurrentFaculty()).then((res) => {
      if (res && res.data && res.data.data) {
        setFaculty(res.data.data);
      }
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      {Loading ? (
        <h1>loading.....</h1>
      ) : faculty && faculty["isHOD"] ? (
        <GetGatePassRequests />
      ) : (
        <h1>No requests at the moment!!</h1>
      )}
    </>
  );
}

export default ApproveRequests;
