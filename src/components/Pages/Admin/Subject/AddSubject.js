import React, { useState } from "react";
import useHeading from "../../useHeading";
import SubjectForm from "./SubjectForm";
import { useDispatch } from "react-redux";
import Notify from "../../../../utils/Notify";
import BackButton from "../../../buttons/BackButton";
import { addSubject } from "../../../../redux/apiActions";
const AddSubject = () => {
  useHeading("Add Subject");
  const dispatch = useDispatch();

  const Initform = {
    name: "",
    code: "",
    courseType: "theory",
    department: "CE",
    semester: "1",
    taughtBy: "",
  };
  const initError = {
    email: "",
    type: "",
    password: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    const fieldValue = { ...Form };
    fieldValue[name] = name === "code" ? value.toLowerCase() : value;
    setForm(fieldValue);
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    var validForm = true;
    const isNullOrWhiteSpace = (str) => {
      return !str || str.length === 0 || /^\s*$/.test(str);
    };
    Object.keys(Form).forEach((key) => {
      if (isNullOrWhiteSpace(Form[key])) {
        validForm = false;
        err[key] = "This field is required";
      }
    });
    setError(err);
    if (validForm) {
      setLoading(true);
      dispatch(addSubject(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setnotify({
              msg: "Subject created",
              popup: true,
              type: "success",
            });
            setLoading(false);
            setForm({ ...Form, name: "", code: "" });
          } else {
            setnotify({
              msg: res.data.msg,
              popup: true,
              type: "error",
            });
            setLoading(false);
          }
        }
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  return (
    <>
      <BackButton />
      <Notify props={notify} closeAlert={closeAlert} />
      <SubjectForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        handleSubmit={handleSubmit}
        Helper={""}
        title={"Add Subject"}
        loading={loading}
        ready={() => {}}
      />
    </>
  );
};
export default AddSubject;
