export const HAS_EVENTS = "has-events";
export const FREE_DAY = "free-day";
export const NO_SCHEDULE = "no-schedule";

export const classifyEmptyState = data => {
    if (!data?.events?.length) return NO_SCHEDULE;
    if (!data?.today?.length) return FREE_DAY;
    return HAS_EVENTS;
};
