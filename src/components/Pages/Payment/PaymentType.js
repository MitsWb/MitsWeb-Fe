import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPaymentTypes } from "../../../redux/apiActions";
import Notify from "../../../utils/Notify";
import BackButton from "../../buttons/BackButton";
import useHeading from "../Shared/useHeading";
import PaymentTypeForm from "./PaymentTypeForm";

const PaymentType = () => {
  useHeading("Payment");
  const dispatch = useDispatch();
  const initForm = {
    type: "",
    amount: "",
    dueDate: "",
  };

  const initError = {
    type: "",
    amount: "",
    dueDate: "",
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

      if (isNaN(Form.amount)) {
        formValid = false;
        err["amount"] = "Must be a number";
      }

      if (Number(Form.amount) < 0) {
        formValid = false;
        err["amount"] = "Amount cannot be negative";
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
      dispatch(createPaymentTypes(Form)).then((res) => {
        if (res && res.data) {
          if (res.data.success) {
            setNotify({
              msg: "Payment type created",
              popup: true,
              type: "success",
            });
            setForm(initForm);
            setLoading(false);
          } else {
            setNotify({
              msg: "Payment type creation failed!!",
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
      <PaymentTypeForm
        Form={Form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title={"Create Payment Types"}
        loading={loading}
        Error={Error}
      />
    </>
  );
};

export default PaymentType;
