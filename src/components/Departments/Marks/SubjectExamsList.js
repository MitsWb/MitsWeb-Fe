import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Notify } from "../../../utils";
import { getExamSubjects } from "./../../../redux/apiActions";
import { CardSkeleton } from "./../../../utils";
import SubjectExamsCard from "./SubjectExamsCard";

function SubjectExamsList({ department, semester }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });
  useEffect(() => {
    setLoading(true);
    dispatch(getExamSubjects({ department, semester })).then((res) => {
      if (res && res.data && res.data.success) {
        setData(res.data.data);
      } else {
        if (res && res.data) {
          setNotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setLoading(false);
    });
  }, [dispatch, semester, department]);

  const NoResults = () => {
    return <>No exams found</>;
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      {loading ? (
        <CardSkeleton xs={12} height={150} />
      ) : data.length === 0 ? (
        <div className="w-full text-center">
          <NoResults />
        </div>
      ) : (
        <div>
          <Grid container spacing={3}>
            {data.map((value, key) => {
              return (
                <Grid key={key} item xs={12} sm={3}>
                  <SubjectExamsCard data={value} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
}

export default SubjectExamsList;
