import { logout } from "./../auth/logout.service";

export async function triggerCamera() {
  const token = localStorage.getItem("access_token");

  const response = await fetch("http://localhost:3000/camera/trigger", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    logout();
  } else {
    return await response.json();
  }
}
