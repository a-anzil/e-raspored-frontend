export const ICON_SLUGS = [
    "coding",
    "math",
    "physics",
    "croatian",
    "english",
    "geography",
    "history",
    "religion",
    "ethics",
    "sports",
    "computers",
    "practical-computers",
    "databases",
    "networking",
    "digital-logic",
    "electronics",
    "other"
];

export const DEFAULT_ICON = "coding";

export const iconAsset = slug =>
    `/icons/${ICON_SLUGS.includes(slug) ? slug : DEFAULT_ICON}.png`;
