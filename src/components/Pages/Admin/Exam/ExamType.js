import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExamType } from "../../../../redux/apiActions";
import Notify from "../../../../utils/Notify";
import useHeading from "../../Shared/useHeading";
import ExamTypeForm from "./ExamTypeForm";
import BackButton from "../../../buttons/BackButton";
const ExamType = () => {
  useHeading("Exam");
  const dispatch = useDispatch();
  const initForm = {
    type: "",
    maxMark: "",
    passMark: "",
  };

  const initError = {
    type: "",
    maxMark: "",
    passMark: "",
  };
  const [Form, setForm] = useState(initForm);
  const [Error, setError] = useState(initError);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (Form[key] === "") {
        formValid = false;
        err[key] = "This field is required";
      }

      if (isNaN(Form.maxMark)) {
        formValid = false;
        err["maxMark"] = "Must be a number";
      }

      if (isNaN(Form.passMark)) {
        formValid = false;
        err["passMark"] = "Must be a number";
      }

      if (Number(Form.passMark) > Number(Form.maxMark)) {
        formValid = false;
        err["passMark"] = "Cannot be greater than max mark";
      }
    });

    setError(err);

    return formValid;
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    setError(err);
    if (validInputs()) {
      setLoading(true);
      dispatch(createExamType(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setNotify({
              msg: "Exam type created",
              popup: true,
              type: "success",
            });
            setForm(initForm);
            setLoading(false);
          } else {
            setNotify({
              msg: "Exam type creation failed!!",
              popup: true,
              type: "error",
            });
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
      <Notify props={notify} closeAlert={closeAlert} />
      <BackButton />
      <ExamTypeForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title={"Create Exam Types"}
        loading={loading}
        Error={Error}
      />
    </>
  );
};

export default ExamType;
