import axios from "axios";

import { env } from "./config";

const AUTH_TOKEN_KEY = "access_token";

export const apiClient = axios.create({
  baseURL: env.backendBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY) ?? localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    } as typeof config.headers;
  }

  return config;
});
