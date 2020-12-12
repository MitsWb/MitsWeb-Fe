import React, { useState } from "react";
import moment from "moment";
import LeaveForm from "./LeaveForm";
import useHeading from "../../Pages/useHeading";
import BackButton from "../../buttons/BackButton";

export default function RequestLeave() {
  useHeading("Request Leave");
  const Initform = {
    type: "",
    description: "",
  };
  const initError = {
    type: "",
    description: "",
    toDate: "",
    fromDate: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [date, setDate] = useState({
    from: new Date("2020-12-30T21:11:54"),
    to: new Date("2020-12-31T21:11:54"),
  });

  const [Loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleDatechange = (dateNow, type) => {
    setDate({ ...date, [type]: dateNow });
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);
    const optionalValues = [""];

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "" && !optionalValues.includes(key)) {
        formValid = false;
        err[key] = "This field is required";
      }
    });

    if (moment(date.from).isValid() === false) {
      err["fromDate"] = "Invalid From date";
      formValid = false;
    }

    if (moment(date.to).isValid() === false) {
      err["toDate"] = "Invalid To Date";
      formValid = false;
    }

    setError(err);
    return formValid;
  };

  const handleSubmit = (secureUrl) => {
    if (validInputs()) {
      const Result = {
        ...Form,
      };
      setForm(Initform);
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };

  return (
    <>
      <LeaveForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        type={"Add"}
        Helper={""}
        Loading={Loading}
        handleDateChange={handleDatechange}
        date={date}
      />
    </>
  );
}
