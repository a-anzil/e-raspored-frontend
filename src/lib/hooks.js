import { useEffect, useState } from "react";
import { fetchWithAuth, getKey } from "./utils";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const key = getKey();
        if (!key) {
            setLoading(false);
            return;
        }

        fetchWithAuth("/user")
            .then(response => {
                if (!response.ok) {
                    localStorage.removeItem("key");
                    return null;
                }

                return response.json();
            })
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, []);

    return [user, loading];
};
