import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Events } from "../features/schedule/Events";
import { Welcome } from "../features/onboarding/Welcome";
import { NotificationStep } from "../features/onboarding/NotificationStep";
import { useSubscription } from "../shared/useSubscription";
import { resolveOnboarding, WELCOME, NOTIF_STEP } from "../features/onboarding/resolveOnboarding";

export const Root = () => {
    const [searchParams] = useSearchParams();
    const urlKey = searchParams.get("key");

    if (urlKey) {
        localStorage.setItem("key", urlKey);
        localStorage.setItem("firstVisit", "true");
        window.history.replaceState(null, "", "/");
    }

    const key = urlKey ?? localStorage.getItem("key");
    if (!key) return <Welcome/>;

    return <OnboardingGate/>;
};

const OnboardingGate = () => {
    const [isSubscribed, loading] = useSubscription();
    const [firstVisit, setFirstVisit] = useState(() => Boolean(localStorage.getItem("firstVisit")));

    if (loading) return <p>...</p>;

    const notifPermission = typeof Notification !== "undefined" ? Notification.permission : "default";
    const destination = resolveOnboarding({ hasKey: true, firstVisit, isSubscribed, notifPermission });
    if (destination === WELCOME) return <Welcome/>;

    if (destination === NOTIF_STEP) {
        return (
            <NotificationStep onDone={() => {
                localStorage.removeItem("firstVisit");
                setFirstVisit(false);
            }}/>
        );
    }

    return <Events/>;
};
