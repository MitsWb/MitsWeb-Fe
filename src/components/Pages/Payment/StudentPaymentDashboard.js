import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRazorpay } from "../../../redux/apiActions";
import { Notify } from "../../../utils";
import useHeading from "../Shared/useHeading";
import PaymentForm from "./PaymentForm";

const loadRazorpay = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const __DEV__ = document.domain === "localhost";

const StudentPaymentDashboard = () => {
  const dispatch = useDispatch();
  useHeading("Payment");

  const initForm = {
    paymentType: "",
    amount: "",
    date: "",
    remarks: "",
  };

  const initError = {
    paymentType: "",
    amount: "",
    date: "",
    remarks: "",
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
    setForm({ ...Form, [name]: value });
  };

  const isNullOrWhiteSpace = (str) => {
    return !str || str.length === 0 || /^\s*$/.test(str);
  };

  const validInputs = () => {
    let formValid = true;
    let err = Object.assign({}, initError);

    Object.keys(Form).forEach((key) => {
      if (isNullOrWhiteSpace(Form[key])) {
        formValid = false;
        err[key] = "This field is required";
      }

      if (isNaN(Form.amount) || isNullOrWhiteSpace(Form.amount)) {
        formValid = false;
        err["numberOfQuestions"] = "Must be a number";
      }

      if (Number(Form.amount) < 0) {
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

  const displayRazorpay = async (data) => {
    const options = {
      key: __DEV__
        ? process.env.RAZORPAY_KEY_ID_DEVELOPMENT
        : process.env.RAZORPAY_KEY_ID_DEVELOPMENT,
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "Muthoot Institute Of Technology And Science",
      description: "Test Transaction",
      image:
        "https://raw.githubusercontent.com/arihant-2310/.github-images/main/logo.png",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        setLoading(false);
        setForm(initForm);
        setError(initError);
        setNotify({
          msg: "Payment Successful",
          popup: true,
          type: "success",
        });
      },

      notes: {
        paymentType: data.paymentType,
        userEmail: data.userEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async () => {
    let err = Object.assign({}, initError);
    setError(err);
    if (validInputs()) {
      setLoading(true);
      const res = await loadRazorpay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        setNotify({
          msg: "Failed to load payment gateway!!",
          popup: true,
          type: "error",
        });
        return;
      }

      setLoading(true);
      dispatch(getRazorpay(Form)).then((res) => {
        if (res && res.data && res.data.success) {
          displayRazorpay(res.data.data);
        } else {
          setNotify({
            msg: "Failed to load payment gateway!!",
            popup: true,
            type: "error",
          });
        }
        setLoading(false);
      });
    }
  };

  return (
    <>
      <Notify props={notify} closeAlert={closeAlert} />
      <PaymentForm
        Form={Form}
        Error={Error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        Loading={Loading}
        setForm={setForm}
        title={"Make Payment"}
      />
    </>
  );
};

export default StudentPaymentDashboard;
