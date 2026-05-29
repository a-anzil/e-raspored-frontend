import { useEffect, useState } from "react";
import { fetchWithAuth, getLoginUrl } from "../../shared/http";
import { rrulestr } from "rrule";
import { classifyEmptyState, FREE_DAY, NO_SCHEDULE } from "./emptyState";
import { buildEventViewModel } from "./eventView";
import "./Events.css";
import "../../shared/Button.css";

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

    const state = classifyEmptyState(events);
    if (state === NO_SCHEDULE) return <NoSchedule/>;
    if (state === FREE_DAY) return <FreeDay/>;

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
            <h1>Današnji raspored</h1>
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

const Event = ({ event, upcoming, running }) => {
    const vm = buildEventViewModel(event, { running, upcoming }, new Date());

    return (
        <div className={"Event " + vm.statusKind}>
            <h2 className="name">{event.name}</h2>
            {vm.statusLabel &&
                <p className={"status " + vm.statusKind}>{vm.statusLabel}</p>
            }
            <p className="description">
                {vm.timeText && <span className="time">{vm.timeText}</span>}
                {vm.location && <><br/><span className="location">{vm.location}</span></>}
                {event.description && <><br/>{event.description}</>}
            </p>
        </div>
    );
};

const FreeDay = () => (
    <div className="Events empty">
        <h1>Današnji raspored</h1>
        <div className="empty-card">
            <h2>Danas nemaš ništa</h2>
            <p>Tvoj raspored je danas slobodan.</p>
        </div>
    </div>
);

const NoSchedule = () => (
    <div className="Events empty">
        <h1>Današnji raspored</h1>
        <div className="empty-card">
            <h2>Još nemaš raspored</h2>
            <p>Izgleda da nema spremljenih sati. Sinkroniziraj svoj kalendar!.</p>
            <button className="button" onClick={() => {
                localStorage.removeItem("key");
                window.location.href = getLoginUrl();
            }}>
                Sinkroniziraj kalendar
            </button>
        </div>
    </div>
);
