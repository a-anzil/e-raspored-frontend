import { useEffect, useState } from "react";

export const getKey = () => localStorage.getItem("key");

export const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://schedule.antonio32a.workers.dev";


export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const key = getKey();
        if (!key) {
            setLoading(false);
            return;
        }

        fetch(BASE_URL + "/user", {
            headers: {
                authorization: `Bearer ${key}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, []);

    return [user, loading];
};
