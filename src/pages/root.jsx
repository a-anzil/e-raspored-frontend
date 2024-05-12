import { useSearchParams } from "react-router-dom";
import { Events } from "../components/Events";
import { Placeholder } from "../components/Placeholder";

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

    return key ? <Events/> : <Placeholder/>;
};
