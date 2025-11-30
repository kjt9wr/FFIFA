import axios from "axios";
import { BASE_URL_LOCALHOST } from "../utilities/constants";

const backend_url =
  process.env.REACT_APP_PRODUCTION_ENVIRONMENT === "Production"
    ? process.env.REACT_APP_SERVER_BASE_URL
    : BASE_URL_LOCALHOST;

const apiClient = axios.create({
  baseURL: backend_url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

// apiClient.js
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response.status === 409) {
      console.log(
        "Conflict Error: Player already exists. ",
        error.response.data
      );
      // Unauthorized
    } else {
      console.error("API call failed:", error);
    }
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
