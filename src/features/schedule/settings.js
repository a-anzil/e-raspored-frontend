import { DEFAULT_ICON } from "./icons";

export const OFFSET_OPTIONS = [5, 10, 15, 30];

export const DEFAULT_SETTINGS = {
    offset: 5,
    startReminder: true,
    endReminder: true,
    icon: DEFAULT_ICON
};

export const resolveSettings = stored => ({ ...DEFAULT_SETTINGS, ...(stored ?? {}) });
