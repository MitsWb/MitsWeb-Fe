import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMyCourses } from "../../../redux/apiActions";
import ShowResourcesForm from "./ShowResourcesForm";
import Loader from "./../../../utils/Loader";

function ShowResources() {
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getMyCourses()).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          setLoading(false);
          setCourses(res.data.data);
        }
        setLoading(false);
      }
    });
  }, [dispatch]);
  return <>{loading ? <Loader /> : <ShowResourcesForm courses={courses} />}</>;
}

export default ShowResources;
