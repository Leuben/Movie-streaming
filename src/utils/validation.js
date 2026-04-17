export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePassword = (password) =>
  password.length >= 6;

export const validateFile = (file) => {
  if (!file) return false;
  const allowed = ['image/jpeg', 'image/png'];
  return allowed.includes(file.type) && file.size < 2000000;
};