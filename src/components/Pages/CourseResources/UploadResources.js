import React, { useState } from "react";
import axios from "axios";
import UploadResourcesForm from "./UploadResourcesForm";
import { Notify } from "../../../utils";

function UploadResources() {
  const initForm = {
    department: "",
    semester: "",
    subject: "",
    topic: "",
    description: "",
    type: "notes",
  };
  const initError = {
    department: "",
    semester: "",
    subject: "",
    topic: "",
    description: "",
    type: "",
  };

  const [notify, setNotify] = useState({ popup: false, msg: "", type: "" });
  const [form, setForm] = useState(initForm);
  const [error, setError] = useState(initError);
  const [fileCollection, setFileCollection] = useState([]);

  const handleChange = (e) => {
    setError(initError);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData();
    if (fileCollection.length > 0)
      for (let img of fileCollection[0]) {
        formData.append("resources", img);
      }

    const options = {
      headers: {
        "Content-type": "multipart/form-data",
        "mitsweb-access-token":
          localStorage.getItem("mitsweb-access-token") || "",
      },
    };

    for (let [key, value] of Object.entries(form)) {
      if (key !== "resources") formData.append(key, value);
    }

    try {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/shared/resources`,
          formData,
          options
        )
        .then((res) => {
          setFileCollection([]);
          if (res && res.data) {
            if (res.data.success) {
              setNotify({
                popup: true,
                type: "success",
                msg: "Files were updated successfully 😀",
              });
              setError(initError);
              setForm(initForm);
            } else {
              setNotify({
                popup: true,
                type: "error",
                msg: res.data.msg,
              });
            }
          }
        });
    } catch (err) {
      setFileCollection([]);
      setNotify({
        popup: true,
        type: "error",
        msg: err.message,
      });
    }
  };

  const closeAlert = () => {
    setNotify({
      popup: false,
    });
  };
  const onFileChange = (files) => {
    let items = files.map((fileItem) => fileItem.file);
    if (items.length === 0) {
      setFileCollection([]);
    } else setFileCollection([...fileCollection, items]);
  };
  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <UploadResourcesForm
        form={form}
        setForm={setForm}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        fileCollection={fileCollection}
        setFileCollection={onFileChange}
      />
    </>
  );
}

export default UploadResources;
