/** The single composition switch used by DI containers. */
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";
console.log("MOCK MODE RAW:", import.meta.env.VITE_USE_MOCK_API);
console.log("ALL ENV:", import.meta.env);

export const mockDelay = (ms = 220) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms));
