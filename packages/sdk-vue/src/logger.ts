type LogLevel = "info" | "error" | "warn";

export const log = (level: LogLevel, message: string) => {
  const packageName = "[@screeb/vue-sdk]";

  switch (level) {
    case "info":
      // eslint-disable-next-line no-console
      console.log(`${packageName} ${message}`);
      break;
    case "warn":
      // eslint-disable-next-line no-console
      console.warn(`${packageName} ${message}`);
      break;
    case "error":
      // eslint-disable-next-line no-console
      console.error(`${packageName} ${message}`);
      break;
    default:
      // eslint-disable-next-line no-console
      console.log(`${packageName} ${message}`);
  }
};
