export default {
  currentUser: {
    path: "/user/getUser",
    noAuth: false,
  },
  loginGoogle: {
    path: "/auth/googlelogin",
    method: "POST",
    noAuth: true,
  },
  register: {
    path: "/auth/signup",
    method: "post",
    noAuth: true,
  },
  login: {
    path: "/auth/signin",
    method: "post",
    noAuth: true,
  },
  updateProfile: {
    path: "/user/updateuser",
    method: "POST",
    noAuth: false,
  },
  getAllusers: {
    path: "/admin/allstudents",
    method: "get",
    noAuth: false,
  },
  getAllfaculties: {
    path: "/admin/allfaculties",
    method: "get",
    noAuth: false,
  },
  getAlladmins: {
    path: "/admin/alladmins",
    method: "get",
    noAuth: false,
  },
  adminUpdateuser: {
    path: "/admin/updateuser",
    method: "post",
    noAuth: false,
  },
  deleteUser: {
    path: "/admin/deleteuser",
    method: "post",
    noAuth: false,
  },
  addUser: {
    path: "/admin/adduser",
    method: "post",
    noAuth: false,
  },
  addUsers: {
    path: "/admin/addusers",
    method: "post",
    noAuth: false,
  },
  addSubject: {
    path: "/admin/subject",
    method: "post",
    noAuth: false,
  },
  deleteSubject: {
    path: "/admin/subject",
    method: "delete",
    noAuth: false,
  },
  editSubject: {
    path: "/admin/subject",
    method: "put",
    noAuth: false,
  },

  getStudent: {
    path: "/user/student",
    method: "get",
  },
  //leave application api's
  requestLeave: {
    path: "/leaveapplication/request",
    method: "post",
    noAuth: false,
  },
  getUsersLeave: {
    path: "/leaveapplication",
    method: "get",
    noAuth: false,
  },
  cancelLeave: {
    path: "leaveapplication/cancel",
    method: "post",
    noAuth: false,
  },
  editLeave: {
    path: "leaveapplication/edit",
    method: "post",
    noAuth: false,
  },
  //gatepass api's
  requestGatePass: {
    path: "/gatepass/request",
    method: "post",
    noAuth: false,
  },
  getUserPasses: {
    path: "/gatepass",
    method: "get",
    noAuth: false,
  },

  cancelGatepass: {
    path: "/gatepass/cancel",
    method: "post",
    noAuth: false,
  },
  editGatepass: {
    path: "/gatepass/edit",
    method: "post",
    noAuth: false,
  },
  viewGatepass: {
    path: "/gatepass/view",
    method: "get",
    noAuth: false,
  },
  //faculty api's

  getGatepasses: {
    path: "/faculty/gatepass",
    method: "get",
    noAuth: false,
  },
  getExams: {
    path: "/faculty/exam",
    method: "get",
    noAuth: false,
  },
  getExamSubjects: {
    path: "/faculty/exam/subjects",
    method: "post",
    noAuth: false,
  },
  createExam: {
    path: "/faculty/exam",
    method: "post",
    noAuth: false,
  },
  deleteExam: {
    path: "/faculty/exam",
    method: "delete",
    noAuth: false,
  },
  editExam: {
    path: "/faculty/exam",
    method: "put",
    noAuth: false,
  },

  getLeaves: {
    path: "/faculty/leaves",
    method: "get",
    noAuth: false,
  },

  getStudents: {
    path: "/faculty/getstudents",
    method: "post",
    noAuth: false,
  },

  findStudents: {
    path: "/faculty/findStudents",
    method: "post",
    noAuth: false,
  },

  addAttendance: {
    path: "/faculty/attendance",
    method: "post",
    noAuth: false,
  },

  getAttendanceList: {
    path: "/faculty/getattendance",
    method: "post",
    noAuth: false,
  },

  addMarks: {
    path: "/faculty/marks",
    method: "post",
    noAuth: false,
  },

  getMyclasses: {
    path: "/faculty/myclasses",
    method: "get",
    noAuth: false,
  },
  //security apis
  verifyGatepass: {
    path: "/security/verify",
    method: "post",
    noAuth: false,
  },

  //time table
  getTimetable: {
    path: "admin/timetable",
    method: "get",
    noAuth: false,
  },
  createTimetable: {
    path: "admin/timetable",
    method: "post",
    noAuth: false,
  },

  //exam
  getExamType: {
    path: "admin/examtype",
    method: "get",
    noAuth: false,
  },
  createExamType: {
    path: "admin/examtype",
    method: "post",
    noAuth: false,
  },
  editExamType: {
    path: "admin/examtype",
    method: "put",
    noAuth: false,
  },
  deleteExamType: {
    path: "admin/examtype",
    method: "delete",
    noAuth: false,
  },

  //shared

  getExamTypes: {
    path: "shared/examtype",
    method: "get",
    noAuth: false,
  },

  getTimetablebyID: {
    path: "shared/timetable",
    method: "get",
    noAuth: false,
  },

  //subjects
  getAllsubjects: {
    path: "/shared/subject",
    method: "get",
    noAuth: false,
  },

  getClassTimetable: {
    path: "/faculty/timetable",
    method: "post",
    noAuth: false,
  },

  getStudentTimetable: {
    path: "/student/timetable",
    method: "get",
  },

  getTeachers: {
    path: "/student/teachers",
    method: "get",
  },

  //payment
  createPaymentTypes: {
    path: "/payment/type",
    method: "post",
    noAuth: false,
  },

  getPaymentTypes: {
    path: "/payment/types",
    method: "get",
    noAuth: false,
  },

  getRazorpay: {
    path: "payment/razorpay",
    method: "post",
    noAuth: false,
  },

  //feedback apis
  postFeebbackCategory: {
    path: "feedback/category",
    method: "post",
    noAuth: false,
  },
  getFeebbackCategory: {
    path: "feedback/category",
    method: "get",
    noAuth: false,
  },
  updateFeebbackCategory: {
    path: "feedback/category",
    method: "put",
    noAuth: false,
  },
  postFeedbackQuestions: {
    path: "feedback/questions",
    method: "post",
    noAuth: false,
  },
  getFeedbackQuestions: {
    path: "feedback/questions",
    method: "post",
    noAuth: false,
  },
  validFeedbackType: {
    path: "feedback/isvalid",
    method: "get",
    noAuth: false,
  },
  getFeebbackList: {
    path: "feedback/getfeedback",
    method: "post",
    noAuth: false,
  },
  changeStat: {
    path: "admin/stats",
    method: "get",
    noAuth: false,
  },
  postFeedback: {
    path: "feedback",
    method: "post",
    noAuth: false,
  },
};
