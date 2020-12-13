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
