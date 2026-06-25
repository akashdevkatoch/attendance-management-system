import axios from "axios";

const api = axios.create({
  baseURL: "https://attendance-backend-cptr.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Session expired sirf protected APIs ke liye
    if (status === 401 && !url.includes("/auth/login")) {
      alert("Session Expired. Please Login Again.");

      localStorage.clear();

      window.location.replace("/");
    }

    return Promise.reject(error);
  }
);

export default api;