export const getKey = () => localStorage.getItem("key")

export const BASE_URL = process.env.NODE_ENV === "development"
    ? "http://localhost:8787"
    : "https://schedule.antonio32a.workers.dev";
