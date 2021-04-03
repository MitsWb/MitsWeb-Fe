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
  verifyGatepass: {
    path: "/security/verify",
    method: "post",
    noAuth: false,
  },
};
