import { useEffect, useState } from "react";

const URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787/user"
    : "https://schedule.antonio32a.workers.dev/user";

export const UserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const key = localStorage.getItem("key");
        fetch(URL, {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
            .then(response => response.json())
            .then(data => setUser(data));
    }, []);

    return (
        <div>
            {user ? (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Google ID: {user.googleId}</p>
                    <p>Ime: {user.name}</p>
                </div>
            ) : (
                <p>Učitavanje...</p>
            )}
        </div>
    );
};
