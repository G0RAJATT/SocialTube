import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5800/api/v1",
  withCredentials: true
});

// GLOBAL ERROR HANDLER
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)

);

export { api };
