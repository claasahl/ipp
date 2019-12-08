import { createLogger, format, transports } from "winston";

import CONFIG from "./config";

export const logger = createLogger({
  level: CONFIG.log_level,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.json()
  ),
  defaultMeta: { service: CONFIG.name },
  transports: [new transports.Console()]
});
logger.debug("active configuration", CONFIG);
export default logger;
