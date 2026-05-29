import { fetchWithAuth } from "./http";

const PUBLIC_KEY = "BKDHteUuTOeOEIvB_ter5WFYYhIYimwZU6Ep2N6Cnrqz-9EvXVvY7pfHYEXXZ7xIrHyGTkiMFvx7RvULjGaeB8Q";

export const SUBSCRIBED = "subscribed";
export const DENIED = "denied";
export const ERROR = "error";

export const isPushActive = async () => {
    if (typeof Notification !== "undefined" && Notification.permission !== "granted") return false;
    if (!("serviceWorker" in navigator)) return false;

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return Boolean(subscription);
};

export const subscribeToPush = async () => {
    try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
        });

        const res = await fetchWithAuth("/user/subscribe", {
            method: "POST",
            body: JSON.stringify(subscription)
        });

        return res.ok ? { kind: SUBSCRIBED } : { kind: ERROR };
    } catch (err) {
        if (err?.name === "NotAllowedError") return { kind: DENIED };
        return { kind: ERROR };
    }
};

const urlBase64ToUint8Array = base64String => {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
