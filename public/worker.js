/* eslint-disable no-restricted-globals */

self.addEventListener("push", event => {
    const data = event.data.json();
    const { title, ...options } = data;
    return self.registration.showNotification(data.title, options);
});