import { fetchWithAuth, getLoginUrl } from "./http";

const PENDING_KEY = "resyncPending";

export const SYNCED = "synced";
export const REAUTH = "reauth";

export const markResyncPending = () => sessionStorage.setItem(PENDING_KEY, "true");
export const isResyncPending = () => sessionStorage.getItem(PENDING_KEY) === "true";
export const clearResyncPending = () => sessionStorage.removeItem(PENDING_KEY);

export const resync = async () => {
    const response = await fetchWithAuth("/user/sync", { method: "POST" });
    if (response.status === 409) {
        return { kind: REAUTH };
    }
    return { kind: SYNCED, events: await response.json() };
};

export const forceLogin = () => {
    localStorage.removeItem("key");
    window.location.href = getLoginUrl();
};
