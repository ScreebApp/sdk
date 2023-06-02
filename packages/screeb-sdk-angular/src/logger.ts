type LogLevel = "info" | "error" | "warn";

/**
 * Logs messages in the console with a corresponding urgency
 *
 * @param level the urgency of the message
 * @param message the message to log in the console
 */
export const log = (level: LogLevel, message: string) => {
  const packageName = "[@screeb/angular-sdk]";

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
