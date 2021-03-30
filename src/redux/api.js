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

  getUserRequests: {
    path: "/gatepass/userrequests",
    method: "get",
    noAuth: false,
  },
  cancelGatepass: {
    path: "/gatepass/cancel",
    method: "post",
    noAuth: false,
  },
  //faculty api's
  getCurrentFaculty: {
    path: "/user/faculty",
    method: "get",
    noAuth: false,
  },

  editGatepass: {
    path: "/gatepass/edit",
    method: "post",
    noAuth: false,
  },
};
