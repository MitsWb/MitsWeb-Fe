import React, { useState } from "react";
import LeaveForm from "./LeaveForm";
import useHeading from "../../Pages/useHeading";
import moment from "moment";
import { useDispatch } from "react-redux";
import { requestLeave } from "../../../redux/apiActions";
import Notify from "../../../utils/Notify";
import BackButton from "../../buttons/BackButton";

export default function RequestLeave() {
  useHeading("Request Leave");
  const Initform = {
    type: "",
    description: "",
    toDate: moment().format("MMM Do YY"),
    fromDate: moment().format("MMM Do YY"),
    fromTimestamp: new Date(),
    toTimestamp: new Date(),
  };
  const initError = {
    type: "",
    description: "",
    toDate: "",
    fromDate: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);

  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });
  const [date, setDate] = useState({
    fromDate: new Date(),
    toDate: tomorrow,
  });

  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleDatechange = (dateNow, type) => {
    setDate({ ...date, [type]: dateNow });
    if (type === "fromDate") {
      setForm({
        ...Form,
        fromTimestamp: new Date(dateNow),
        fromDate: moment(dateNow).format("MMM Do YY"),
      });
    }
    if (type === "toDate") {
      setForm({
        ...Form,
        toTimestamp: new Date(dateNow),
        toDate: moment(dateNow).format("MMM Do YY"),
      });
    }
  };

  function validInputs() {
    let formValid = true;
    let err = Object.assign({}, initError);
    Object.keys(Form).forEach((key) => {
      if (Form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }
    });
    setError(err);
    return formValid;
  }

  const handleSubmit = () => {
    let err = Object.assign({}, initError);

    setError(err);
    setLoading(true);

    if (validInputs()) {
      dispatch(requestLeave(Form)).then((res) => {
        if (res && res.data) {
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
        handleDateChange={handleDatechange}
        handleSubmit={handleSubmit}
        date={date}
      />
    </>
  );
}
