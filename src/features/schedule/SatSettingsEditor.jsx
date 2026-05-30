import { useState } from "react";
import { OFFSET_OPTIONS } from "./settings";
import { ICON_SLUGS, iconAsset } from "./icons";
import { saveEventSettings } from "./settingsApi";
import "./SatSettingsEditor.css";
import "../../shared/Button.css";

export const SatSettingsEditor = ({ eventId, editUrl, settings, onSave, onClose }) => {
    const [draft, setDraft] = useState(settings);
    const [working, setWorking] = useState(false);
    const [error, setError] = useState(null);

    const update = patch => setDraft(prev => ({ ...prev, ...patch }));

    const save = async () => {
        setWorking(true);
        setError(null);
        try {
            const saved = await saveEventSettings(eventId, draft);
            onSave(saved);
            onClose();
        } catch (e) {
            setError(e.message);
        } finally {
            setWorking(false);
        }
    };

    return (
        <div className="SatSettingsEditor">
            {editUrl &&
                <a
                    className="button secondary calendar-edit"
                    href={editUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    Uredi u Google Kalendaru
                </a>
            }

            <div className="field">
                <span className="label">Podsjetnik</span>
                <div className="offsets">
                    {OFFSET_OPTIONS.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={"offset" + (draft.offset === option ? " selected" : "")}
                            onClick={() => update({ offset: option })}
                        >
                            {option} min
                        </button>
                    ))}
                </div>
            </div>

            <label className="toggle">
                <input
                    type="checkbox"
                    checked={draft.startReminder}
                    onChange={event => update({ startReminder: event.target.checked })}
                />
                <span>Podsjetnik prije početka</span>
            </label>

            <label className="toggle">
                <input
                    type="checkbox"
                    checked={draft.endReminder}
                    onChange={event => update({ endReminder: event.target.checked })}
                />
                <span>Podsjetnik prije kraja</span>
            </label>

            <div className="field">
                <span className="label">Ikona</span>
                <div className="icons">
                    {ICON_SLUGS.map(slug => (
                        <button
                            key={slug}
                            type="button"
                            className={"icon" + (draft.icon === slug ? " selected" : "")}
                            onClick={() => update({ icon: slug })}
                        >
                            <img src={iconAsset(slug)} alt={slug}/>
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="actions">
                <button type="button" className="button" disabled={working} onClick={save}>
                    {working ? "..." : "Spremi"}
                </button>
                <button type="button" className="button secondary" disabled={working} onClick={onClose}>
                    Odustani
                </button>
            </div>
        </div>
    );
};
