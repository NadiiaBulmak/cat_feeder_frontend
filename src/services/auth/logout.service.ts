export function logout() {
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('user');
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');

  return undefined;
}