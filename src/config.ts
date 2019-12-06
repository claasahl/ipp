import { types } from "scrive-open-api";
import rateLimit from "express-rate-limit";

interface Config {
  /**
   * Public host of this integration (e.g. https://teamtailor.scrive.com or http://localhost:3000)
   */
  host: string;
  /**
   * Port on which this integration is listening (e.g. 3000 or 8000). This is not necessarily the publically exposed port.
   */
  port: number;
  /**
   * Name of integration / application / service
   */
  name: string;
  /**
   * Log Level
   */
  log_level: string;
  /**
   * SCRIVE configuration settings
   */
  scrive: {
    host: string;
    credentials: types.PersonalAccessCredentials;
  };
  /**
   * GECKOBOARD configuration settings
   */
  security: {
    rateLimit: rateLimit.Options;
  };
}
const CONFIG: Config = {
  host: process.env.HOST || "configure env. variable HOST",
  port: parseInt(process.env.PORT || "configure env. variable PORT"),
  name: process.env.name || "configure env. variable NAME",
  log_level: process.env.LOG_LEVEL || "configure env. variable LOG_LEVEL",
  scrive: {
    host:
      process.env.SCRIVE_API_HOST || "configure env. variable SCRIVE_API_HOST",
    credentials: {
      accesstoken:
        process.env.SCRIVE_ACCESSTOKEN ||
        "configure env. variable SCRIVE_ACCESSTOKEN",
      accesssecret:
        process.env.SCRIVE_ACCESSSECRET ||
        "configure env. variable SCRIVE_ACCESSSECRET",
      apitoken:
        process.env.SCRIVE_APITOKEN ||
        "configure env. variable SCRIVE_APITOKEN",
      apisecret:
        process.env.SCRIVE_APISECRET ||
        "configure env. variable SCRIVE_APISECRET"
    }
  },
  security: {
    rateLimit: {
      windowMs: Number(
        process.env.RATE_LIMIT_WINDOW_MS ||
          "configure env. variable RATE_LIMIT_WINDOW_MS"
      ),
      max: Number(
        process.env.RATE_LIMIT_MAX || "configure env. variable RATE_LIMIT_MAX"
      )
    }
  }
};
export default CONFIG;
