import React, { useState } from "react";
import useHeading from "../../useHeading";
import AddUserForm from "./AddUserForm";

const AddUser = () => {
  useHeading("Add User");
  const Initform = {
    email: "",
    type: "",
  };
  const initError = {
    email: "",
    type: "",
  };

  const [Form, setForm] = useState(Initform);
  const [Error, setError] = useState(initError);

  const handleChange = (e) => {
    setError(initError);
    const { value, name } = e.target;
    setForm({ ...Form, [name]: value });
  };

  return (
    <>
      <AddUserForm
        Form={Form}
        handleChange={handleChange}
        Error={Error}
        Helper={""}
      />
    </>
  );
};
export default AddUser;
