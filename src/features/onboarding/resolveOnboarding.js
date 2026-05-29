export const WELCOME = "welcome";
export const NOTIF_STEP = "notif-step";
export const EVENTS = "events";

export const resolveOnboarding = ({ hasKey, firstVisit, isSubscribed, notifPermission }) => {
    if (!hasKey) return WELCOME;
    if (firstVisit && !isSubscribed && notifPermission !== "denied") return NOTIF_STEP;
    return EVENTS;
};
