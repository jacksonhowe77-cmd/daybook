"use strict";

const CACHE_NAME = "daybook-shell-v21";
const APP_SHELL = [
  "./",
  "./index.html",
  "./classes-example.json",
  "./notebook.webmanifest",
  "./notebook-icon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request);
    })
  );
});

self.addEventListener("push", event => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (error) {
    console.error("Could not parse a Daybook push message", error);
    payload = { body: event.data ? event.data.text() : "" };
  }
  event.waitUntil(
    self.registration.showNotification(payload.title || "Daybook reminder", {
      body: payload.body || "You have something coming up in your calendar.",
      icon: "./notebook-icon.svg",
      badge: "./notebook-icon.svg",
      tag: payload.tag || "daybook-push",
      data: { url: new URL(payload.url || "./index.html", self.registration.scope).href }
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const requestedDestination = new URL(event.notification.data?.url || "./index.html", self.registration.scope);
  const destination = requestedDestination.origin === self.location.origin
    ? requestedDestination.href
    : new URL("./index.html", self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
      const appUrl = new URL("./", self.registration.scope).href;
      const indexUrl = new URL("./index.html", self.registration.scope).href;
      const existing = clients.find(client => new URL(client.url).href === appUrl || new URL(client.url).href === indexUrl);
      if (existing) return existing.navigate(destination).then(() => existing.focus());
      return self.clients.openWindow(destination);
    })
  );
});
