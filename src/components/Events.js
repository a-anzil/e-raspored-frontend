import { useEffect, useState } from "react";

const URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787/user/events"
    : "https://schedule.antonio32a.workers.dev/user/events";

export const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const key = localStorage.getItem("key");
        fetch(URL, {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setEvents(data)
            });
    }, []);

    return (
        <div>
            {events ? (
                <div>
                    {events.map(event => {
                        return (
                            <div>
                                <p>ID: {event.id}</p>
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
            ) : "Učitavanje..."}
        </div>
    );
};

