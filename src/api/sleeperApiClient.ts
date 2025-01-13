import axios from "axios";

const sleeperApiClient = axios.create({
  baseURL: "https://api.sleeper.app/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default sleeperApiClient;
