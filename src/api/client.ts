import axios from "axios";

import { env } from "./config";

export const apiClient = axios.create({
  baseURL: env.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
