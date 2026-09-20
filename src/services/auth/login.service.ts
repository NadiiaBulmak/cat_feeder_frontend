import { apiClient } from "../../api/client";

export async function login(email: string, password: string) {
  const response = await apiClient.post(`/auth/login`, { email, password });
  const data = response.data ?? {};

  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
}
