export default {
  currentUser: {
    path: "/user/getUser",
    noAuth: false,
  },
  register: {
    path: "/signup",
    method: "post",
    noAuth: true,
  },
  login: {
    path: "/signin",
    method: "post",
    noAuth: true,
  },
  updateProfile: {
    path: "/user/updateuser",
    method: "POST",
    noAuth: false,
  },
};
