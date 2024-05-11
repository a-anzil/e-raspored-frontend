import "./Header.css";
import { LoginButton } from "./LoginButton";
import { useUser } from "../lib/hooks";
import { Link } from "react-router-dom";

export const Header = () => {
    const [user, loading] = useUser();
    let loginState;
    if (loading) {
        loginState = <p>...</p>;
    } else if (user) {
        loginState = <Link to="/user">{user.name}</Link>;
    } else {
        loginState = <LoginButton/>;
    }

    return (
        <header className="Header">
            <div className="items">
                <Link className="logo" to="/">
                    <img className="logo-icon" src="/favicon-colored.svg" alt="Logo" width="32" height="32"/>
                    <h1 className="gradient-color">e-Raspored</h1>
                </Link>

                <div className="login page">
                    {loginState}
                </div>
            </div>
        </header>
    );
};

/*
                <Link className="page" to="/">
                    <p><strong>oi</strong></p>
                </Link>
                <Link className="page" to="/">
                    <p><strong>oi</strong></p>
                </Link>
 */