import { SubscribeButton } from "../components/SubscribeButton";
import { LoginButton } from "../components/LoginButton";
import { useUser } from "../lib/hooks";
import { useNavigate } from "react-router-dom";
import "../components/Button.css";
import { getLoginUrl } from "../lib/utils";

export const User = () => {
    const navigate = useNavigate();
    const [user, loading] = useUser();
    if (loading) return <p>...</p>;
    if (!user) {
        return <LoginButton/>;
    }

    const shouldReturn = localStorage.getItem("firstVisit");
    return (
        <div>
            <h1>Pozdrav {user.name}!</h1>

            <SubscribeButton onSuccess={() => {
                if (shouldReturn) {
                    navigate("/", { replace: true });
                    localStorage.removeItem("firstVisit");
                }
            }}/>

            <button onClick={() => {
                localStorage.removeItem("key");
                window.location.href = getLoginUrl();
            }} className="button generic">
                Sinkroniziraj kalendar
            </button>

            <button onClick={() => {
                localStorage.removeItem("key");
                window.location.href = "/";
            }} className="button inactive">
                Odjavi se
            </button>
        </div>
    );
};
