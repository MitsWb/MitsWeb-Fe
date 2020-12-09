export const phonePreg = (phone) => {
  //eslint-disable-next-line
  const pattern = /^((\+91|91|0)[\- ]{0,1})?[456789]\d{9}$/;
  return pattern.test(phone);
};

export const isNumber = (number) => {
  const pattern = /^[0-9]+$/;
  return pattern.test(number);
};

export const validatePassword = (password) => {
  const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return pattern.test(password);
};

export const validateLocationCoordinates = (location) => {
  const pattern = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/;
  return pattern.test(location);
};

export const validateEmailAddress = (email) => {
  //eslint-disable-next-line
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

export const getArrayValueByKey = (arr, attr, value) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][attr] === value) {
      return i;
    }
  }
  return -1;
};

export const getRandomNumbers = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};
