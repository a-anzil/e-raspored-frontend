export const STATUS_RUNNING = "running";
export const STATUS_UPCOMING = "upcoming";
export const STATUS_NONE = "";

const formatClock = date => date.toLocaleString("hr-HR", {
    hour: "numeric",
    minute: "numeric"
});

const formatTimeRange = (event, reference) => {
    const start = event.rrule.after(reference);
    if (!start) return "";
    const end = new Date(start.getTime() + (event.endTime - event.startTime));
    return `${formatClock(start)} – ${formatClock(end)}`;
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
            timeText: formatTimeRange(event, startOfDay(now)),
            location: event.location ?? ""
        };
    }

    if (upcoming) {
        return {
            statusLabel: "Uskoro",
            statusKind: STATUS_UPCOMING,
            timeText: formatTimeRange(event, now),
            location: event.location ?? ""
        };
    }

    return {
        statusLabel: "",
        statusKind: STATUS_NONE,
        timeText: formatTimeRange(event, startOfDay(now)),
        location: event.location ?? ""
    };
};
