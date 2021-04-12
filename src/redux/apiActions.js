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

export const getAllsubjects = () => {
  return fireRequest("getAllsubjects");
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
//security apis

export const verifyGatepass = (body) => {
  return fireRequest("verifyGatepass", [], body);
};
