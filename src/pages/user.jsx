import { useState } from "react";
import { LoginButton } from "../features/auth/LoginButton";
import { useUser } from "../features/auth/useUser";
import { useSubscription } from "../shared/useSubscription";
import { subscribeToPush, SUBSCRIBED } from "../shared/push";
import { markResyncPending, forceLogin, REAUTH, resync } from "../shared/sync";
import { buildCreateEventUrl } from "../shared/createEventUrl";
import { Account } from "../features/account/Account";

export const User = () => {
    const [user, loading] = useUser();
    const [isSubscribed, subscriptionLoading, setIsSubscribed] = useSubscription();
    const [working, setWorking] = useState(false);
    const [syncWorking, setSyncWorking] = useState(false);
    const [note, setNote] = useState(null);

    if (loading) return <p>...</p>;
    if (!user) return <LoginButton/>;

    const sync = async () => {
        setSyncWorking(true);
        const result = await resync();
        if (result.kind === REAUTH) {
            forceLogin();
            return;
        }
        setSyncWorking(false);
    };

    const logOut = () => {
        localStorage.removeItem("key");
        localStorage.removeItem("firstVisit");
        window.location.href = "/";
    };

    const enableNotifications = async () => {
        setWorking(true);
        setNote(null);
        const result = await subscribeToPush();
        setWorking(false);
        if (result.kind === SUBSCRIBED) {
            setIsSubscribed(true);
            return;
        }
        setNote("Možeš ih uključiti kasnije s ovog mjesta.");
    };

    return (
        <Account
            user={user}
            isSubscribed={isSubscribed}
            subscriptionLoading={subscriptionLoading}
            working={working}
            syncWorking={syncWorking}
            note={note}
            createEventUrl={buildCreateEventUrl()}
            onCreateEvent={markResyncPending}
            onSync={sync}
            onLogOut={logOut}
            onEnableNotifications={enableNotifications}
        />
    );
};
