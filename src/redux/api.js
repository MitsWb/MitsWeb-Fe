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
};
