import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"  // 👈 includes /api
      : "https://task-management-system-4n5j.onrender.com/api" // 👈 also includes /api
});

export default api;
