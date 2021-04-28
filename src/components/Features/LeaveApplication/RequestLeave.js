import React, { useState } from "react";
import LeaveForm from "./LeaveForm";
import useHeading from "../../Pages/Shared/useHeading";
import { useDispatch } from "react-redux";
import { requestLeave } from "../../../redux/apiActions";
import Notify from "../../../utils/Notify";
import BackButton from "../../buttons/BackButton";

export default function RequestLeave() {
  useHeading("Request Leave");

  const Initform = {
    description: "",
    toDate: "",
    type: "fullDay",
    fromTime: "",
    toTime: "",
    date: "",
  };
  const initError = {
    type: "",
    description: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });

  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    if (isNullOrWhiteSpace(Form.description)) {
      formValid = false;
      err["description"] = "This field is required";
    }
    if (Form.date === "") {
      formValid = false;
      err["date"] = "This field is required";
    }
    if (Form.type === "halfDay") {
      if (Form.fromTime === "") {
        formValid = false;
        err["fromTime"] = "This field is required";
      }
      if (Form.toTime === "") {
        formValid = false;
        err["toTime"] = "This field is required";
      }
    } else {
      if (Form.toDate === "") {
        formValid = false;
        err["toDate"] = "This field is required";
      }
    }
    console.log(err);
    setError(err);
    return formValid;
  }

  const handleSubmit = () => {
    let err = Object.assign({}, initError);

    setError(err);
    console.log(Form);
    if (validInputs()) {
      dispatch(requestLeave(Form)).then((res) => {
        if (res && res.data) {
          console.log(res.data);
          if (res.data.success) {
            setNotify({
              msg: "Leave application submitted",
              popup: true,
              type: "success",
            });
            setLoading(false);
            setForm(Initform);
          } else {
            setNotify({
              msg: "Leave application submission failed!!",
              popup: true,
              type: "error",
            });
            setLoading(false);
          }
        }
        setLoading(false);
      });
    }
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  return (
    <>
      <BackButton />
      <Notify props={notify} closeAlert={closeAlert} />
      <LeaveForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        Helper={""}
        Loading={Loading}
        title="new"
        handleSubmit={handleSubmit}
      />
    </>
  );
}
