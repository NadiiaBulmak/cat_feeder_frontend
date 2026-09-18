import { apiClient } from "../api/client";

export const getFeeder = async (id: string) => {
  const response = await apiClient.get(`/feeders/${id}`);

  return response.data;
};

export const sendFeederCommand = async (
  feederId: string,
  command: "open" | "close",
) => {
  const response = await apiClient.patch(`/feeders/${feederId}/${command}`);

  return response.data;
};

export const getUserFeeders = async () => {
  const response = await apiClient.get("/feeders/me");

  return response.data;
};
