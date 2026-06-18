type LogLevel = "warn";

export const log = (level: LogLevel, message: string) => {
  if (level === "warn") {
    // eslint-disable-next-line no-console
    console.warn(message);
  }
};
