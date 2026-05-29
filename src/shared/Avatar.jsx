import "./Avatar.css";
import { useState } from "react";

const getInitials = (name) => {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "?";
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const Avatar = ({ name, src, size = 32 }) => {
    const [failed, setFailed] = useState(false);
    const style = { width: size, height: size, fontSize: size * 0.4 };

    if (src && !failed) {
        return (
            <img
                className="Avatar"
                style={style}
                src={src}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setFailed(true)}
            />
        );
    }

    return (
        <span className="Avatar" style={style} aria-hidden="true">
            {getInitials(name)}
        </span>
    );
};
