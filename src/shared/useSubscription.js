import { useEffect, useState } from "react";
import { isPushActive } from "./push";

export const useSubscription = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isPushActive()
            .then(active => {
                setIsSubscribed(active);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return [isSubscribed, loading, setIsSubscribed];
};
