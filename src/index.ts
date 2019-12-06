import express from "express";
import responseTime from "response-time";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import CONFIG from "./config";
import logger from "./logger";
import routes from "./routes";
import { Request } from "express";

const app = express();

// ... keep track of incoming requests and their response times
app.use(
  responseTime((req: Request, res, time) => {
    const { method, originalUrl: url } = req;
    const { statusCode } = res;
    logger.info("Handled request.", { method, url, statusCode, time });
  })
);

// ... security related middlewares
app.use(helmet());
app.use(
  rateLimit({
    ...CONFIG.security.rateLimit,
    keyGenerator: req => req.header("x-real-ip") || req.ip
  })
);

// ... start integration
app.use("/api/v1", routes);
app.listen(CONFIG.port, () => logger.info(`Listening on port ${CONFIG.port}`));
