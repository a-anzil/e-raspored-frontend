import { fetchWithAuth } from "../../shared/http";

export const saveEventSettings = async (eventId, settings) => {
    const response = await fetchWithAuth(`/user/events/${eventId}/settings`, {
        method: "PUT",
        body: JSON.stringify(settings)
    });

    if (!response.ok) {
        throw new Error("Spremanje postavki nije uspjelo");
    }

    return response.json();
};
