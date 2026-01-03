import api from "./api.js";

export const login = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const register = (name, email, password) => {
  return api.post("/auth/register", { name, email, password });
};

export const logout = () => {
  return api.post("/auth/logout", {}, { withCredentials: true });
};

export const getMe = () => {
  return api.get("/auth/me", {
    withCredentials: true,
  });
};
export const getAllUsers = () => {
  return api.get("/users");
};
