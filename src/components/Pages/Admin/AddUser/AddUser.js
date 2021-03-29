import React, { useState } from "react";
import useHeading from "../../useHeading";
import AddUserForm from "./AddUserForm";
import { validateEmailAddress } from "../../../../utils/validation";
import { addUser } from "../../../../redux/apiActions";
import { useDispatch } from "react-redux";
import Notify from "../../../../utils/Notify";

const AddUser = () => {
  useHeading("Add User");
  const dispatch = useDispatch();

  const Initform = {
    email: "",
    type: "student",
    password: "",
  };
  const initError = {
    email: "",
    type: "",
    password: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);
  const [notify, setnotify] = useState({ popup: false, msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    const fieldValue = { ...Form };
    fieldValue[name] = name === "email" ? value.toLowerCase() : value;
    setForm(fieldValue);
  };

  const handleSubmit = () => {
    let err = Object.assign({}, initError);
    var validForm = true;
    if (!validateEmailAddress(Form.email)) {
      err["email"] = "Invalid email";
      validForm = false;
    }
    if (Form.password === "") {
      err["password"] = "invalid password";
      validForm = false;
    }
    setError(err);

    if (validForm) {
      setLoading(true);
      dispatch(addUser(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setnotify({ msg: "User created", popup: true, type: "success" });
            setLoading(false);
            setForm(Initform);
          } else {
            setnotify({
              msg: "User already exists",
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
    setnotify({
      popup: false,
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <AddUserForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        handleSubmit={handleSubmit}
        Helper={""}
        loading={loading}
      />
    </>
  );
};
export default AddUser;
