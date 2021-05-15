import React from "react";
import Addbutton from "../../buttons/AddButton";
import useHeading from "../Shared/useHeading";

const AdminPaymentDashboard = () => {
  useHeading("Payment");
  return (
    <>
      <Addbutton title={"Add Payment Types"} href={"/payment/createtypes"} />
    </>
  );
};

export default AdminPaymentDashboard;
