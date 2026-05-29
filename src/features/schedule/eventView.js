export const STATUS_RUNNING = "running";
export const STATUS_UPCOMING = "upcoming";
export const STATUS_NONE = "";

const formatTime = (rrule, reference) => {
    const nextOccurrence = rrule.after(reference);
    if (!nextOccurrence) return "";
    return nextOccurrence.toLocaleString("hr-HR", {
        hour: "numeric",
        minute: "numeric"
    });
};

const startOfDay = now => {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    return day;
};

export const buildEventViewModel = (event, { running, upcoming }, now) => {
    if (running) {
        return {
            statusLabel: "Trenutno traje",
            statusKind: STATUS_RUNNING,
            timeText: "",
            location: event.location ?? ""
        };
    }

    if (upcoming) {
        return {
            statusLabel: "Uskoro",
            statusKind: STATUS_UPCOMING,
            timeText: formatTime(event.rrule, now),
            location: event.location ?? ""
        };
    }

    return {
        statusLabel: "",
        statusKind: STATUS_NONE,
        timeText: formatTime(event.rrule, startOfDay(now)),
        location: event.location ?? ""
    };
};
