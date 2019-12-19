import debuck from "debug";

import CONFIG from "./config";

const log = debuck(CONFIG.name);
export const info = log.extend("info");
export const error = log.extend("error");
export const debug = log.extend("debug");

debug("active configuration %o", CONFIG);
export default {
  info,
  error,
  debug: debuck
};
