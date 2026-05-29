import "./Welcome.css";
import { LoginButton } from "../auth/LoginButton";

export const Welcome = () => (
    <div className="Welcome">
        <div className="card">
            <h1 className="gradient-color">Dobrodošli na e-Raspored</h1>
            <p className="lead">
                Prijavi se Google računom i tvoj se kalendar automatski sinkronizira.
            </p>
            <div className="login-action">
                <LoginButton/>
            </div>
            <p className="note">
                Prijava je potrebna za pristup rasporedu.
            </p>
        </div>
    </div>
);
