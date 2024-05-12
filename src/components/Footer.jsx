import "./Footer.css";
import { Github } from "./icons";

const GITHUB = "https://github.com";

export const Footer = () => (
    <footer className="Footer">
        <div className="items">
            <div className="social-icons">
                <a href={GITHUB} target="_blank" rel="noreferrer">
                    <Github/>
                </a>
            </div>

            <p>
                Antonio Anzil @ 2024
            </p>
        </div>
    </footer>
);
