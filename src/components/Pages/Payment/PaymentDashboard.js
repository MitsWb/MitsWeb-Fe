import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRazorpay } from "../../../redux/apiActions";

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

function PaymentDashboard() {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const displayRazorpay = async () => {
    const res = await loadRazorpay(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay sdk failed to load...!!");
      return;
    }
    dispatch(getRazorpay([])).then((res) => {
      if (res && res.data && res.data.success) {
        setData(res.data.data);
      } else {
        alert("failed");
      }
    });
    const options = {
      key: __DEV__
        ? process.env.RAZORPAY_KEY_ID_DEVELOPMENT
        : process.env.RAZORPAY_KEY_ID_PRODUCTION,
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
      },
      // prefill: {
      //   name: "MITS WEB",
      //   email: "arihant2310@mitsweb.com",
      //   contact: "9999999999",
      // },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {/* TODO : Design the UI */}
      <Typography>Payment should be done</Typography>
      <Button variant="contained" onClick={displayRazorpay}>
        Pay 500/-
      </Button>
    </>
  );
}

export default PaymentDashboard;
