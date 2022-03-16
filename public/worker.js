/* eslint-disable no-restricted-globals */

self.addEventListener("push", event => {
    const data = event.data.json();
    const { title, ...options } = data;

    event.waitUntil(
        self.registration.getNotifications()
            .then(notifications => notifications.forEach(n => n.close()))
            .then(() => self.registration.showNotification(title, options))
    );
});