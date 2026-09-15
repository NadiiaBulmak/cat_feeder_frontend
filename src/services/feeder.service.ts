import { apiClient } from '../api/client';
import { env } from '../api/config';

export const getFeeder = async (id: string) => {
  const response = await apiClient.get(`/feeders/${id}`);

  return response.data;
};

export const sendFeederCommand = async (
  command: 'open' | 'close',
) => {
  const response = await apiClient.patch(
    `/feeders/${env.feederId}/${command}`
  );

  return response.data;
};