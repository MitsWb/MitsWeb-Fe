import React, { useState, useEffect } from "react";
import useHeading from "../../Shared/useHeading";
import { useDispatch } from "react-redux";
import { getExams } from "../../../../redux/apiActions";
import ExamForm from "./ExamForm";
const EditExam = ({ examId, handleSubmit }) => {
  useHeading("Edit Exam");
  const dispatch = useDispatch();
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
  useEffect(() => {
    setLoading(true);
    dispatch(getExams(examId + "/edit")).then((res) => {
      if (res && res.data && res.data.success) {
        setForm(res.data.data);
      }
      setLoading(false);
    });
  }, [dispatch, examId]);
  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...Form, [name]: value });
  };

  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (
        key !== "numberOfQuestions" &&
        isNullOrWhiteSpace(Form[key]) &&
        key !== "__v"
      ) {
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

      if (!(Number(Form.numberOfQuestions) > 0)) {
        formValid = false;
        err["numberOfQuestions"] = "Invalid Number";
      }
    });

    setError(err);

    return formValid;
  };

  const handleValidate = () => {
    if (validInputs()) {
      handleSubmit(Form);
    }
  };

  return (
    <>
      <ExamForm
        Form={Form}
        title={"Edit Exam"}
        Error={Error}
        handleChange={handleChange}
        handleSubmit={handleValidate}
        Loading={Loading}
        setForm={setForm}
      />
    </>
  );
};

export default EditExam;
