import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestGatePass } from "../../../redux/apiActions";
import useHeading from "../../Pages/useHeading";
import GatePassForm from "./GatePassForm";
import Notify from "../../../utils/Notify";
import BackButton from "../../buttons/BackButton";
export default function RequestGatePass() {
  useHeading("Request Gate Pass");
  const dispatch = useDispatch();

  const Initform = {
    description: "",
    time: new Date(),
  };
  const initError = {
    description: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };
  const handleDatechange = (dateNow) => {
    setForm({
      ...Form,
      time: dateNow,
    });
    setDate(dateNow);
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    var validForm = true;

    setError(err);
    setLoading(true);

    if (validForm) {
      dispatch(requestGatePass(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setNotify({
              msg: "Gate pass requested",
              popup: true,
              type: "success",
            });
            setLoading(false);
            setForm(Initform);
          } else {
            setNotify({
              msg: "Gate pass request failed!!",
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
      <GatePassForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        title="Request Gate Pass"
        Helper={""}
        handleDateChange={handleDatechange}
        handleSubmit={handleSubmit}
        date={date}
        loading={loading}
      />
      <br />
    </>
  );
}
