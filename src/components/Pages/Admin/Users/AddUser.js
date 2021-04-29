import React, { useState } from "react";
import useHeading from "../../Shared/useHeading";
import AddUserForm from "./AddUserForm";
import { validateEmailAddress } from "../../../../utils/validation";
import { addUser, addUsers } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Notify, Loader } from "../../../../utils";
import BackButton from "../../../buttons/BackButton";

const AddUser = () => {
  useHeading("Add User");
  const dispatch = useDispatch();

  const Initform = {
    email: "",
    type: "student",
    password: "",
    department: "None",
    currentYear: "None",
    passoutYear: "None",
    rollNo: "",
    joiningYear: "",
  };
  const initError = {
    email: "",
    type: "",
    password: "",
    rollNo: "",
    joiningYear: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [loading, setLoading] = useState({ form: false, full: false });

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    const fieldValue = { ...Form };
    fieldValue[name] = name === "email" ? value.toLowerCase() : value;
    setForm(fieldValue);
  };
  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };
  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    let validForm = true;

    if (!validateEmailAddress(Form.email)) {
      err["email"] = "Invalid email";
      validForm = false;
    }

    if (Form.type === "faculty" && Form.department === "None") {
      err["department"] = "Add department";
      validForm = false;
    }

    if (
      Form.type === "student" &&
      (Form.department === "None" ||
        Form.currentYear === "None" ||
        Form.passoutYear === "None")
    ) {
      err["department"] = "Add department";
      validForm = false;
    }

    if (
      (Form.type === "student" || Form.type === "faculty") &&
      (isNaN(Form.rollNo) || isNullOrWhiteSpace(Form.rollNo))
    ) {
      err["rollNo"] = "Enter a number";
      validForm = false;
    }

    if (
      Form.type === "faculty" &&
      (isNaN(Form.joiningYear) || isNullOrWhiteSpace(Form.joiningYear))
    ) {
      err["joiningYear"] = "Enter a number";
      validForm = false;
    }

    if (Form.password === "" || isNullOrWhiteSpace(Form.password)) {
      err["password"] = "invalid password";
      validForm = false;
    }
    setError(err);
    if (validForm) {
      setLoading({ ...loading, form: true });
      dispatch(addUser(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setnotify({ msg: "User created", popup: true, type: "success" });
            setForm(Initform);
          } else {
            setnotify({
              msg: res.data.msg,
              popup: true,
              type: "error",
            });
          }
        }
        setLoading({ ...loading, form: false });
      });
    }
  };
  const closeAlert = () => {
    setnotify({
      popup: false,
    });
  };
  const handleConfirm = (type, arr = []) => {
    setLoading({ ...loading, full: true });
    dispatch(addUsers({ type, data: arr })).then((res) => {
      if (res && res.data && res.data.success) {
        if (res.data.ok) {
          setnotify({ msg: res.data.msg, popup: true, type: "success" });
        } else {
          setnotify({
            msg: "Saved with some problems",
            popup: true,
            type: "warning",
          });
        }
      } else {
        if (res && res.data) {
          setnotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setLoading({ ...loading, full: false });
    });
  };
  return (
    <>
      <BackButton />
      <Notify props={notify} closeAlert={closeAlert} />
      {loading.full ? (
        <Loader msg={"Please wait...."} />
      ) : (
        <AddUserForm
          Form={Form}
          handleChange={handleChange}
          Error={Error}
          handleSubmit={handleSubmit}
          Helper={""}
          loading={loading.form}
          handleConfirm={handleConfirm}
        />
      )}
    </>
  );
};
export default AddUser;
