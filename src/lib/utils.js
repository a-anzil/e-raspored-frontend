export const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://schedule.antonio32a.workers.dev";

export const getKey = () => localStorage.getItem("key")

export const getLoginUrl = () => BASE_URL + "/login-redirect";

export const fetchWithAuth = (url, props = {}) => fetch(BASE_URL + url, {
    ...props,
    headers: {
        "Authorization": `Bearer ${getKey()}`,
        "Content-Type": "application/json"
    }
});
