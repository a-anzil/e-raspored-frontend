import "../../shared/Button.css";
import "./Account.css";

export const Account = ({
    user,
    isSubscribed,
    subscriptionLoading,
    working,
    note,
    onSync,
    onLogOut,
    onEnableNotifications
}) => (
    <div className="Account">
        <h1>Pozdrav {user.name}!</h1>

        <section className="setting">
            <h2>Kalendar</h2>
            <p className="status">Tvoj kalendar je sinkroniziran.</p>
            <button className="button" onClick={onSync}>
                Sinkroniziraj kalendar
            </button>
        </section>

        <section className="setting">
            <h2>Obavijesti</h2>
            {subscriptionLoading ? (
                <p className="status">...</p>
            ) : isSubscribed ? (
                <p className="status">Obavijesti su omogućene.</p>
            ) : (
                <>
                    <p className="status">Obavijesti nisu omogućene.</p>
                    {note && <p className="note">{note}</p>}
                    <button className="button" disabled={working} onClick={onEnableNotifications}>
                        {working ? "..." : "Omogući obavijesti"}
                    </button>
                </>
            )}
        </section>

        <button className="button secondary log-out" onClick={onLogOut}>
            Odjavi se
        </button>
    </div>
);
