import React, { useState } from "react";
import useHeading from "../../Pages/useHeading";
import GatePassForm from "./GatePassForm";

export default function RequestLeave() {
  useHeading("Request Gate Pass");
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
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleDatechange = (dateNow) => {
    setDate(dateNow);
  };

  return (
    <>
      <GatePassForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        Helper={""}
        handleDateChange={handleDatechange}
        date={date}
      />
    </>
  );
}
