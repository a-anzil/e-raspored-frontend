import { useState } from "react";
import "./NotificationStep.css";
import "../../shared/Button.css";
import { subscribeToPush, SUBSCRIBED } from "../../shared/push";

export const NotificationStep = ({ onDone }) => {
    const [working, setWorking] = useState(false);
    const [note, setNote] = useState(null);

    const enable = async () => {
        setWorking(true);
        const result = await subscribeToPush();
        if (result.kind === SUBSCRIBED) {
            onDone();
            return;
        }

        setWorking(false);
        setNote("Možeš ih uključiti kasnije na svojoj stranici računa.");
    };

    return (
        <div className="NotificationStep">
            <div className="card">
                <h1 className="gradient-color">Skoro spremno</h1>
                <p className="lead">
                    Tvoj kalendar je sinkroniziran i tvoj raspored je spreman.
                </p>
                <p className="lead">
                    Želiš li primati obavijesti?
                </p>

                {note && <p className="note">{note}</p>}

                {note ? (
                    <button className="button" onClick={onDone}>
                        Nastavi na raspored
                    </button>
                ) : (
                    <>
                        <button className="button" disabled={working} onClick={enable}>
                            {working ? "..." : "Omogući obavijesti"}
                        </button>
                        <button className="button secondary" disabled={working} onClick={onDone}>
                            Preskoči
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
