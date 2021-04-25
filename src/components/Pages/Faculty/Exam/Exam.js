import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createExam } from "../../../../redux/apiActions";
import { Notify } from "../../../../utils";
import ExamForm from "./ExamForm";
import useHeading from "../../Shared/useHeading";

const Exam = () => {
  const dispatch = useDispatch();
  useHeading("Exam");

  const initForm = {
    examType: "",
    subject: "",
    date: "",
    startTimestamp: "",
    endTimestamp: "",
    numberOfQuestions: "",
  };

  const initError = {
    examType: "",
    subject: "",
    date: "",
    startTimestamp: "",
    endTimestamp: "",
    numberOfQuestions: "",
  };

  const [Form, setForm] = useState(initForm);
  const [Error, setError] = useState(initError);
  const [Loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...Form, [name]: value });
  };

  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (key !== "numberOfQuestions" && isNullOrWhiteSpace(Form[key])) {
        formValid = false;
        err[key] = "This field is required";
      }

      if (
        isNaN(Form.numberOfQuestions) ||
        isNullOrWhiteSpace(Form.numberOfQuestions)
      ) {
        formValid = false;
        err["numberOfQuestions"] = "Must be a number";
      }

      if (Number(Form.numberOfQuestions) < 0) {
        formValid = false;
        err["numberOfQuestions"] = "Cannot be negative";
      }
    });

    setError(err);

    return formValid;
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    setError(err);
    if (validInputs()) {
      setLoading(true);
      dispatch(createExam(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setNotify({
              msg: "Exam created",
              popup: true,
              type: "success",
            });
            setForm(initForm);
            setLoading(false);
          } else {
            setNotify({
              msg: "Exam creation failed!!",
              popup: true,
              type: "error",
            });
          }
        }
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <ExamForm
        Form={Form}
        Error={Error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        Loading={Loading}
        setForm={setForm}
      />
    </>
  );
};

export default Exam;
