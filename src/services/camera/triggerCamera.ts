import { env } from "../../api/config";

export async function triggerCamera(deviceId: string): Promise<string> {
  const token = localStorage.getItem("access_token");
  
  const response = await fetch(`${env.backendBaseUrl}/feeders/${deviceId}/snapshot`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Не вдалося завантажити фото з камери");
  }

  const blob = await response.blob();
  
  return URL.createObjectURL(blob);
}