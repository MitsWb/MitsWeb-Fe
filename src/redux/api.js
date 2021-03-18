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
    path: "/admin/allusers",
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
};
