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

//gatepass api's
export const requestGatePass = (body) => {
  return fireRequest("requestGatePass", [], body);
};

export const getUserPasses = (body) => {
  return fireRequest("getUserPasses", [], body);
};

export const getAlladmins = () => {
  return fireRequest("getAlladmins");
};
export const getAllfaculties = () => {
  return fireRequest("getAllfaculties");
};
export const editGatepass = (body) => {
  return fireRequest("editGatepass", [], body);
};
