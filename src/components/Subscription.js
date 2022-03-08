import React from "react";
import "./Subscription.css";

const PUBLIC_KEY = "BPKNDvpUZnuYNqoOeXDHDXyB28wGjjYrsE0GgwuveOfbweB5hLF7klx43zMb4IcO1lDgxMTMoZXK8E09Df6MOfk";
const URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787/subscribe"
    : "https://schedule.antonio32a.workers.dev/subscribe";

export class Subscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "Omogući Notifikacije", disabled: false };
    }

    render() {
        return (
            <div className="Subscription">
                <button className="button" disabled={this.state.disabled} onClick={async () => {
                    this.setState({ value: "...", disabled: true });
                    const register = await navigator.serviceWorker.ready;

                    const subscription = await register.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
                    });

                    const res = await fetch(URL, {
                        method: "POST",
                        body: JSON.stringify({
                            practicalGroup: "1",
                            group: "ethics",
                            subscription
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    this.setState({ value: await res.text(), disabled: false });
                }}>
                    <b>
                        {this.state.value}
                    </b>
                </button>
            </div>
        );
    }
}

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
