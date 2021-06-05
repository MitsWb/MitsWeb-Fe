import React, { useState, useEffect } from "react";
import Addbutton from "../../buttons/AddButton";
import useHeading from "../Shared/useHeading";
import { Card } from "@material-ui/core";
import { IOS } from "../../Common/Switch";
import { useDispatch } from "react-redux";
import { getPaymentStat, changeStat } from "../../../redux/apiActions";
import { Notify } from "../../../utils";
import Skeleton from "@material-ui/lab/Skeleton";
const AdminPaymentDashboard = () => {
  useHeading("Payment");
  const dispatch = useDispatch();
  const [checked, setchecked] = useState(false);
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    dispatch(getPaymentStat()).then((res) => {
      if (res && res.data && res.data.success) {
        setchecked(res.data.stats);
      }
      setloading(false);
    });
  }, [dispatch]);
  const handleCheck = () => {
    setchecked(!checked);
    dispatch(changeStat(["payment", Number(!checked)])).then((res) => {
      if (res && res.data) {
        setnotify({
          msg: res.data.msg,
          popup: true,
          type: res.data.success ? "success" : "error",
        });
      }
    });
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="w-full">
        {loading ? (
          <>
            <div style={{ marginBottom: "15px" }}>
              <Skeleton
                variant="rect"
                width={150}
                height={40}
                style={{ margin: "0px auto" }}
                animation="wave"
              />
            </div>
          </>
        ) : (
          <div style={{ marginBottom: "15px" }}>
            <Card
              style={{ width: 150, textAlign: "center", margin: "0px auto" }}
            >
              <IOS
                checked={checked}
                handleChange={handleCheck}
                label={checked ? "Active" : "Inactive"}
              />
            </Card>
          </div>
        )}
      </div>
      <Addbutton title={"Add Payment Types"} href={"/payment/createtypes"} />
    </>
  );
};

export default AdminPaymentDashboard;
