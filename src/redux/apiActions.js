import { fireRequest } from "./fireRequest";

export const login = (body) => {
  return fireRequest("login", [], body);
};
export const getCurrentUser = () => {
  return fireRequest("currentUser");
};

export const register = (body) => {
  return fireRequest("register", [], body);
};

export const updateProfile = (body) => {
  return fireRequest("updateProfile", [], body);
};
export const loginGoogle = (body) => {
  return fireRequest("loginGoogle", [], body);
};

//admin apis

export const getAllusers = () => {
  return fireRequest("getAllusers");
};

export const adminUpdateuser = (body) => {
  return fireRequest("adminUpdateuser", [], body);
};

export const deleteUser = (body) => {
  return fireRequest("deleteUser", [], body);
};

export const addUser = (body) => {
  return fireRequest("addUser", [], body);
};

export const addUsers = (body) => {
  return fireRequest("addUsers", [], body);
};
export const addSubject = (body) => {
  return fireRequest("addSubject", [], body);
};

export const editSubject = (body) => {
  return fireRequest("editSubject", [], body);
};
export const deleteSubject = (id) => {
  return fireRequest("deleteSubject", [id]);
};
export const changeStat = (params) => {
  return fireRequest("changeStat", params);
};

export const getPaymentStat = () => {
  return fireRequest("getPaymentStat");
};
//gatepass api's
export const requestGatePass = (body) => {
  return fireRequest("requestGatePass", [], body);
};
export const cancelGatepass = (body) => {
  return fireRequest("cancelGatepass", [], body);
};
export const getUserPasses = (body) => {
  return fireRequest("getUserPasses", [], body);
};

export const getAlladmins = () => {
  return fireRequest("getAlladmins");
};

//leave application api's
export const requestLeave = (body) => {
  return fireRequest("requestLeave", [], body);
};

export const getUsersLeave = (body) => {
  return fireRequest("getUsersLeave", [], body);
};

export const cancelLeave = (body) => {
  return fireRequest("cancelLeave", [], body);
};

export const editLeave = (body) => {
  return fireRequest("editLeave", [], body);
};

//time table api's
export const createTimetable = (body) => {
  return fireRequest("createTimetable", [], body);
};

export const getTimetable = () => {
  return fireRequest("getTimetable");
};

//faculty api's
export const getAllfaculties = () => {
  return fireRequest("getAllfaculties");
};

export const editGatepass = (body) => {
  return fireRequest("editGatepass", [], body);
};

export const getGatepasses = (id) => {
  return fireRequest("getGatepasses", [id]);
};

export const viewGatepass = (id) => {
  return fireRequest("viewGatepass", [id]);
};

export const getLeaves = (id) => {
  return fireRequest("getLeaves", [id]);
};

export const getStudents = (body) => {
  return fireRequest("getStudents", [], body);
};

export const findStudents = (body) => {
  return fireRequest("findStudents", [], body);
};

export const addAttendance = (body) => {
  return fireRequest("addAttendance", [], body);
};

export const getAttendanceList = (body) => {
  return fireRequest("getAttendanceList", [], body);
};

export const getClass = (id) => {
  return fireRequest("getMyclasses", [id]);
};

export const createExam = (body) => {
  return fireRequest("createExam", [], body);
};

export const getExams = (id) => {
  return fireRequest("getExams", [id]);
};

export const getExamSubjects = (body) => {
  return fireRequest("getExamSubjects", [], body);
};

export const addMarks = (body) => {
  return fireRequest("addMarks", [], body);
};

export const getSubjectMarks = (id) => {
  return fireRequest("getSubjectMarks", [id]);
};

//security apis
export const verifyGatepass = (body) => {
  return fireRequest("verifyGatepass", [], body);
};

//exam apis

export const getExamType = () => {
  return fireRequest("getExamType");
};
export const createExamType = (body) => {
  return fireRequest("createExamType", [], body);
};

export const editExam = (body) => {
  return fireRequest("editExam", [], body);
};

export const editExamType = (body) => {
  return fireRequest("editExamType", [], body);
};

export const deleteExamType = (id) => {
  return fireRequest("deleteExamType", [id]);
};

export const deleteExam = (id) => {
  return fireRequest("deleteExam", [id]);
};
//shared apis

export const getExamTypes = () => {
  return fireRequest("getExamTypes");
};

export const getAllsubjects = () => {
  return fireRequest("getAllsubjects");
};

//payment apis

export const createPaymentTypes = (body) => {
  return fireRequest("createPaymentTypes", [], body);
};

export const getPaymentTypes = () => {
  return fireRequest("getPaymentTypes");
};

export const getRazorpay = (body) => {
  return fireRequest("getRazorpay", [], body);
};

export const getClassTimetable = (body) => {
  return fireRequest("getClassTimetable", [], body);
};
export const getStudentTimetable = () => {
  return fireRequest("getStudentTimetable");
};

export const getTimetablebyID = (id) => {
  return fireRequest("getTimetablebyID", [id]);
};

//feedback apis

export const postFeebbackCategory = (body) => {
  return fireRequest("postFeebbackCategory", [], body);
};

export const getFeebbackCategory = (id) => {
  return fireRequest("getFeebbackCategory", [id]);
};

export const updateFeebbackCategory = (body) => {
  return fireRequest("updateFeebbackCategory", [], body);
};

export const postFeedbackQuestions = (body) => {
  return fireRequest("postFeedbackQuestions", [], body);
};

export const getFeedbackQuestions = (id, body) => {
  return fireRequest("getFeedbackQuestions", [id], body);
};

export const postFeedback = (body) => {
  return fireRequest("postFeedback", [], body);
};

export const deleteFeedback = (id) => {
  return fireRequest("deleteFeedback", [id]);
};

export const getTeachers = () => {
  return fireRequest("getTeachers");
};

export const getStudent = () => {
  return fireRequest("getStudent");
};

export const validFeedbackType = (id) => {
  return fireRequest("validFeedbackType", [id]);
};

export const getFeebbackList = (id, body) => {
  return fireRequest("getFeebbackList", [id], body);
};

//course material api's
export const getMyCourses = () => {
  return fireRequest("getMyCourses");
};

//event api's
export const getEvents = () => {
  return fireRequest("getEvents");
};

export const postEvent = (body) => {
  return fireRequest("postEvent", [], body);
};
