/* eslint-disable no-restricted-globals */

self.addEventListener("push", event => {
    const data = event.data.json();
    const { title, ...options } = data;

    event.waitUntil(async () => {
        const notifications = await self.registration.getNotifications();
        for (const notification of notifications) {
            notification.close();
        }

        await self.registration.showNotification(data.title, options);
    });
});