import { AUTH_KEY } from "./hooks";
import { Auth } from "./models";

export function saveAuth(auth: Auth | undefined) {
  if (auth) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
}

export function loadAuth(): Auth | undefined {
  const json = localStorage.getItem(AUTH_KEY);

  if (!json) {
    return undefined;
  }
  
  try { 
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}
