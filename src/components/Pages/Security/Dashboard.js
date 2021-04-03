import React, { useState } from "react";
import QrReader from "react-qr-reader";
import Notify from "../../../utils/Notify";
import { verifyGatepass } from "../../../redux/apiActions";
import { useDispatch } from "react-redux";
import { Card, CardContent, Button, Typography } from "@material-ui/core";

function Dashboard() {
  const dispatch = useDispatch();
  const [notify, setnotify] = useState({ msg: "", popup: false, type: "" });
  const [bgcolor, setcolor] = useState("yellow");
  const [loading, setloading] = useState(false);
  const [scanning, setscanning] = useState(false);
  const handleError = (e) => {
    setnotify({ msg: "Please Allow Permission", popup: true, type: "error" });
  };

  const handleScan = (link) => {
    if (link && !scanning) {
      setnotify({
        msg: "Please turn on scanning",
        popup: true,
        type: "warning",
      });
    }
    if (link && scanning) {
      const arr = link.split("/");
      if (arr) {
        const gatepassId = arr[arr.length - 1];
        setloading(true);
        dispatch(verifyGatepass({ gatepassId })).then((res) => {
          if (res && res.data && res.data.success) {
            setnotify({ msg: res.data.msg, popup: true, type: "success" });
            setcolor("green");
          } else {
            setcolor("red");
            setnotify({ msg: res.data.msg, popup: true, type: "error" });
          }
          setloading(false);
          setscanning(false);
        });
      } else {
        setcolor("red");
        setnotify({ msg: "Invalid Gatepass", popup: true, type: "error" });
        setloading(false);
        setscanning(false);
      }
    }
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setnotify({ popup: false })} />
      <div className="text-center my-2 w-full">
        <Typography variant="h6">Press SCAN to verify QR Code</Typography>
      </div>
      <div className="w-full">
        <Card
          style={{
            backgroundColor: bgcolor,
            paddingTop: 10,
            height: 270,
            width: 270,
            margin: "0px auto",
          }}
        >
          {loading ? (
            <Card
              style={{
                width: 250,
                height: 250,
                textAlign: "center",
                marginLeft: 6,
              }}
            >
              <CardContent>
                <p className="text-lg">LOADING</p>
              </CardContent>
            </Card>
          ) : (
            <QrReader
              delay={300}
              className="m-0 bg-white m-auto"
              onError={handleError}
              onScan={handleScan}
              style={{
                width: 250,
                height: 250,
              }}
            />
          )}
        </Card>
      </div>
      <div className="w-full text-center mt-5">
        <Button
          style={{
            backgroundColor: !scanning ? "indigo" : "grey",
            margin: "0px auto",
            width: 90,
            padding: 3,
            color: "white",
            outline: "none",
          }}
          disabled={scanning}
          onClick={() => {
            setscanning(true);
            setcolor("yellow");
          }}
          className="shadow-md"
        >
          {scanning ? "SCANNING" : "SCAN"}
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
