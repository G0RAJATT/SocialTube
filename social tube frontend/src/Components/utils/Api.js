import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL" , API_URL);

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true
});

// GLOBAL ERROR HANDLER
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)

);

export { api };
