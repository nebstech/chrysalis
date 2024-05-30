const sessionKey = import.meta.env.VITE_SESSION_KEY;

export function getToken() {
  return sessionStorage.getItem(sessionKey);
}

export function clearToken() {
  return sessionStorage.removeItem(sessionKey);
}

export function setToken(value) {
  return sessionStorage.setItem(sessionKey, value);
}
