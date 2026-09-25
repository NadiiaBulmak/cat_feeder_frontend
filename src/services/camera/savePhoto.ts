import { env } from "../../api/config";

export async function saveSnapshotToCloud(imageBlob: Blob, deviceId: string = 'snapshots'): Promise<string> {
  const formData = new FormData();
  formData.append('file', imageBlob, `snapshot_${Date.now()}.jpg`);

  const response = await fetch(`${env.backendBaseUrl}/camera/save-snapshot?folder=${deviceId}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Не вдалося зберегти фото в хмару');
  }

  const data = await response.json();
  return data.url;
}