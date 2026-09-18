import type { FeederState } from "../types/feeder";

export function normalizeState(value?: string): FeederState | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  if (normalized === "open") {
    return "open";
  }

  if (normalized === "close" || normalized === "closed") {
    return "close";
  }

  return undefined;
}

export function getStateLabel(value?: string) {
  const state = normalizeState(value);

  if (state === "open") {
    return "Open";
  }

  if (state === "close") {
    return "Closed";
  }

  return "Unknown";
}

export function getStateClasses(value?: string) {
  const state = normalizeState(value);

  if (state === "open") {
    return "bg-[#f5dfaa] text-[#846525]";
  }

  if (state === "close") {
    return "bg-[#e0edb5] text-[#65752f]";
  }

  return "bg-[#e2e5df] text-[#7c877e]";
}

export function formatDate(value?: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isFeederOnline(lastPing?: string) {
  if (!lastPing) {
    return false;
  }

  const lastPingTime = new Date(lastPing).getTime();

  if (Number.isNaN(lastPingTime)) {
    return false;
  }

  const ONLINE_THRESHOLD = 2 * 60 * 1000;

  return Date.now() - lastPingTime < ONLINE_THRESHOLD;
}
