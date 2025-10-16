import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear session and redirect to login
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
};

// Profile API
export const profileAPI = {
  getProfile: (userId) => api.get(`/profile/user/${userId}`),
  createOrUpdateProfile: (userId, profileData) =>
    api.post(`/profile/user/${userId}`, profileData),
};

// Career API
export const careerAPI = {
  generateRecommendation: (userId) =>
    api.post(`/career/recommendations/${userId}`),
  getLatestRecommendation: (userId) =>
    api.get(`/career/recommendations/${userId}/latest`),
  getAllRecommendations: (userId) =>
    api.get(`/career/recommendations/${userId}/all`),
};

// Course API
export const courseAPI = {
  getAllCourses: () => api.get("/courses"),
  getCourseById: (id) => api.get(`/courses/${id}`),
  getCoursesByCategory: (category) => api.get(`/courses/category/${category}`),
};

// Admin API
export const adminAPI = {
  createCourse: (courseData) => api.post("/admin/courses", courseData),
  createSkill: (skillData) => api.post("/admin/skills", skillData),
  getAllSkills: () => api.get("/admin/skills"),
};

export default api;
