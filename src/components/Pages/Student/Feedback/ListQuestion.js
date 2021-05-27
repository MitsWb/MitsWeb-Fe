import React, { useEffect, useState } from "react";
import { Loader, Notify } from "../../../../utils";
import { useDispatch } from "react-redux";
import { Card, Typography } from "@material-ui/core";
import { getFeedbackQuestions } from "../../../../redux/apiActions";
import Check from "./Checkbox";
function ListQuestion({ id, addFeedback, email, subjectCode }) {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [questions, setquestions] = useState([]);
  const [message, setmessage] = useState("");
  const [feedback, setfeedback] = useState({});
  const [notify, setNotify] = useState({
    popup: false,
    msg: "",
    type: "",
  });
  useEffect(() => {
    setloading(true);
    dispatch(
      getFeedbackQuestions(id, { faculty: email, code: subjectCode })
    ).then((res) => {
      if (res && res.data) {
        if (res.data.success) {
          const QuestionList = res.data.questions.questions;
          setmessage(res.data.msg);
          setquestions(QuestionList);
          let obj = {};
          for (let i = 0; i < QuestionList.length; i++) {
            obj = { ...obj, [QuestionList[i]._id]: "good" };
          }
          setfeedback(obj);
          addFeedback(obj);
        } else {
          setNotify({ msg: res.data.msg, popup: true, type: "error" });
        }
      }
      setloading(false);
    });
    // eslint-disable-next-line
  }, [dispatch, id]);
  const checkChange = (value, questionId) => {
    const newFeedback = { ...feedback, [questionId]: value };
    setfeedback(newFeedback);
    addFeedback(newFeedback);
  };
  return (
    <>
      <Notify props={notify} closeAlert={() => setNotify({ popup: false })} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {message !== "" && (
            <div className="w-full mt-5">
              <Card
                style={{
                  textAlign: "center",
                  paddingTop: 25,
                  paddingBottom: 25,
                  maxWidth: 300,
                  margin: "0px auto",
                }}
              >
                <Typography>{message}</Typography>
              </Card>
            </div>
          )}
          {questions.map((value, index) => {
            return (
              <Card
                key={index}
                className="my-5"
                style={{
                  textAlign: "left",
                  paddingTop: 25,
                  paddingBottom: 25,
                }}
              >
                <Typography
                  className="font-bolder  truncate"
                  style={{ marginLeft: 20 }}
                >
                  {index + 1 + " " + value.question}
                </Typography>
                <Check checkChange={(e) => checkChange(e, value._id)} />
              </Card>
            );
          })}
        </>
      )}
    </>
  );
}

export default ListQuestion;
