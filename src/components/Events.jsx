import { useEffect, useState } from "react";
import { fetchWithAuth } from "../lib/utils";
import "./Events.css";
import { rrulestr } from "rrule";

export const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetchWithAuth("/user/events")
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    if (!events) {
        return <p>...</p>;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parsed = events.events
        .filter(event => events.today.includes(event.id))
        .map(event => {
            const rrule = rrulestr(event.recurrence, { dtstart: new Date(event.startTime) });
            return { ...event, rrule };
        }).sort((a, b) => a.rrule.after(today) - b.rrule.after(today));

    return (
        <div className="Events">
            <h1>
                Današnji raspored
            </h1>
            {parsed.map(event =>
                <Event
                    event={event}
                    upcoming={events.upcoming.includes(event.id)}
                    running={events.currentlyRunning.includes(event.id)}
                    key={event.id}
                />
            )}
        </div>
    );
};

const Event = props => {
    const { event, upcoming, running } = props;

    let time;
    let status = "";

    if (running) {
        time = "🔴 Trenutno traje";
        status = "running";
    } else if (upcoming) {
        time = `🔜 ${parseTime(event.rrule, new Date())}`;
        status = "upcoming";
    } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        time = `📅 ${parseTime(event.rrule, today)}`;
    }

    return (
        <div className={"Event " + status}>
            <h2 className="name">{event.name}</h2>
            <p className="description">
                {time}
                <br/>
                {event.location ? "📍 " + event.location : ""}
                {event.description ? <br/> : ""}
                {event.description}
            </p>
        </div>
    );
};

const parseTime = (rrule, date) => {
    const nextOccurrence = rrule.after(date);
    return nextOccurrence.toLocaleString("hr-HR", {
        hour: "numeric",
        minute: "numeric"
    });
};