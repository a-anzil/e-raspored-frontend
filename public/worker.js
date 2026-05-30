/* eslint-disable no-restricted-globals */

self.addEventListener("push", event => {
    if (!event.data) return;

    let data;
    try {
        data = event.data.json();
    } catch (err) {
        return;
    }

    if (data === null || typeof data !== "object") return;

    const { title, ...options } = data;
    event.waitUntil(self.registration.showNotification(title, options));
});
