import React, { useState } from "react";
import { fetchWithAuth } from "../lib/utils";

const PUBLIC_KEY = "BKDHteUuTOeOEIvB_ter5WFYYhIYimwZU6Ep2N6Cnrqz-9EvXVvY7pfHYEXXZ7xIrHyGTkiMFvx7RvULjGaeB8Q";

export const SubscribeButton = props => {
    const [state, setState] = useState({ value: "Omogući Notifikacije", disabled: false });

    return (
        <div className="SubscribeButton">
            <button className="button" disabled={state.disabled} onClick={async () => {
                setState({ value: "...", disabled: true });

                const register = await navigator.serviceWorker.ready;
                const subscription = await register.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
                });

                const res = await fetchWithAuth("/user/subscribe", {
                    method: "POST",
                    body: JSON.stringify(subscription)
                });

                let text;
                if (res.status === 200) {
                    props?.onSuccess();
                    text = "Notifikacije omogućene!";
                } else {
                    text = "Greška!";
                }

                setState({ value: text, disabled: false });
            }}>
                <b>
                    {state.value}
                </b>
            </button>
        </div>
    );
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
