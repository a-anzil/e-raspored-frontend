import "./Header.css";
import { LoginButton } from "../features/auth/LoginButton";
import { useUser } from "../features/auth/useUser";
import { Avatar } from "../shared/Avatar";
import { Link } from "react-router-dom";

export const Header = () => {
    const [user, loading] = useUser();
    let loginState;
    if (loading) {
        loginState = <span className="loading">...</span>;
    } else if (user) {
        loginState = (
            <Link className="user" to="/user">
                <Avatar name={user.name} src={user.picture}/>
                <span className="user-name">{user.name}</span>
            </Link>
        );
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

                <div className="login">
                    {loginState}
                </div>
            </div>
        </header>
    );
};