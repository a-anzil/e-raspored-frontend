import { useEffect, useState } from "react";
import { fetchWithAuth } from "../lib/utils";

export const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        fetchWithAuth("/user/events")
            .then(response => response.json())
            .then(data => setEvents(data));
    }, []);

    return (
        <div>
            {events ? (
                <div>
                    {events.map(event => {
                        return (
                            <div>
                                <p>Ime: {event.name}</p>
                                <p>Lokacija: {event.location}</p>
                                <p>Početak: {new Date(event.startTime).toLocaleString()}</p>
                                <p>Kraj: {new Date(event.endTime).toLocaleString()}</p>
                                <p>Ponavljanje: {event.recurrence}</p>
                                <p>Korisnik: {event.userId}</p>
                            </div>
                        );
                    })}
                </div>
            ) : "..."}
        </div>
    );
};
