const CALENDAR_TIMEZONE = "Europe/Zagreb";
const REQUIRED_TAG = "#raspored";
const DURATION_MINUTES = 45;

const pad = value => String(value).padStart(2, "0");

const formatLocal = date =>
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}`
    + `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}00`;

const nowInTimezone = timezone => {
    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).formatToParts(new Date());

    const part = type => Number(parts.find(it => it.type === type).value);
    return new Date(Date.UTC(
        part("year"),
        part("month") - 1,
        part("day"),
        part("hour"),
        part("minute"),
        part("second")
    ));
};

export const buildCreateEventUrl = () => {
    const start = nowInTimezone(CALENDAR_TIMEZONE);
    start.setUTCMinutes(0, 0, 0);
    start.setUTCHours(start.getUTCHours() + 1);
    const end = new Date(start.getTime() + DURATION_MINUTES * 60 * 1000);

    const params = new URLSearchParams({
        action: "TEMPLATE",
        details: REQUIRED_TAG,
        recur: "RRULE:FREQ=WEEKLY",
        dates: `${formatLocal(start)}/${formatLocal(end)}`,
        ctz: CALENDAR_TIMEZONE
    });

    return `https://calendar.google.com/calendar/render?${params}`;
};
