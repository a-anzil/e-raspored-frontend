import { useSearchParams } from "react-router-dom";
import { Events } from "../components/Events";

export const Root = () => {
    const [searchParams] = useSearchParams();
    let key = searchParams.get("key");

    if (key) {
        localStorage.setItem("key", key);
        localStorage.setItem("firstVisit", "true");
        window.history.pushState(null, "", "/");
        window.location.href = "/user";
    } else {
        key = localStorage.getItem("key");
    }

    if (key) {
        return <Events/>;
    }

    return (
        <div>
            <p>Dobrodošli na stranicu e-Raspored!</p>
            <p>Prijava je potrebna za pristup sadržaju.</p>
        </div>
    );
};
