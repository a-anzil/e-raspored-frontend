import "./Footer.css";
import { Github } from "../shared/icons";

const GITHUB = "https://github.com/a-anzil/e-raspored-backend";

export const Footer = () => (
    <footer className="Footer">
        <div className="items">
            <div className="social-icons">
                <a href={GITHUB} target="_blank" rel="noreferrer">
                    <Github/>
                </a>
            </div>

            <p>
                Antonio Anzil @ {new Date().getFullYear()}
            </p>
        </div>
    </footer>
);
