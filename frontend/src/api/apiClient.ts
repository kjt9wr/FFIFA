import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
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
