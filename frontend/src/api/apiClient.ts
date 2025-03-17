import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ffifa-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// apiClient.js
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call failed:", error);
    // Handle specific error cases
    // if (error.response.status === 401) {
    //   // Unauthorized
    // } else if (error.response.status === 404) {
    //   // Not found
    // }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    // Add authorization token to every request
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
