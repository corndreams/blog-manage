import axios from "axios";

const http = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: "https://server.corndreams.top",
  timeout: 10000,
});

let authToken = "";
let unauthorizedHandler: (() => void) | null = null;

export function setAuthToken(t: string) {
  authToken = t || "";
}

export function setUnauthorizedHandler(handler: () => void) {
  unauthorizedHandler = handler;
}

function handleUnauthorized() {
  authToken = "";
  unauthorizedHandler?.();
}

http.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers || {};
    (config.headers as any).token = authToken;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(err);
  },
);

export default http;
