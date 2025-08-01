import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api" // Local dev
      : "https://ecommerce-z0zf.onrender.com", // Production full backend URL
  withCredentials: true,
});

export default axiosInstance;
