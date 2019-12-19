import express, { Request } from "express";
import responseTime from "response-time";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";

import CONFIG from "./config";
import logger from "./logger";
import * as ipp from "./ipp/simple";
import { OperationId, StatusCode } from "./ipp/low-level";
import { operations as job } from "./ipp/job/operations";
import { operations as printer } from "./ipp/printer/operations";

const app = express();

// ... keep track of incoming requests and their response times
app.use(
  responseTime((req: Request, res, time) => {
    const { method, originalUrl: url } = req;
    const { statusCode } = res;
    logger.info("Handled request. %o", { method, url, statusCode, time });
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
app.get("/", (_req, res) => res.sendStatus(200));
app.use(
  (req, res, next) => {
    if (req.header("content-type") === "application/ipp") {
      next();
    } else {
      res.status(415).send();
    }
  },
  (req, res, next) => {
    if (req.method === "POST") {
      next();
    } else {
      res.setHeader("Allow", "POST");
      res.status(405).send();
    }
  },
  bodyParser.raw({ type: "application/ipp", inflate: true, limit: "10mb" }),
  (req, res) => {
    const request = ipp.decode(req.body);
    const response = handleIppRequest(request);
    const body = ipp.encode(response);
    res.status(200).send(body);
  }
);
app.listen(CONFIG.port, () => logger.info("Listening on port %d", CONFIG.port));

function handleIppRequest(request: ipp.Message): ipp.Message {
  try {
    switch (request.operationIdOrStatusCode) {
      case OperationId.CancelJob:
        return job.cancelJob(request);
      case OperationId.GetJobAttributes:
        return job.getJobAttributes(request);
      case OperationId.GetJobs:
        return printer.getJobs(request);
      case OperationId.GetPrinterAttributes:
        return printer.getPrinterAttributes(request);
      default:
        return {
          version: "1.1",
          operationIdOrStatusCode: StatusCode.serverErrorVersionNotSupported,
          requestId: request.requestId,
          attributeGroups: []
        };
    }
  } finally {
    logger.info("Handling IPP request. %j", {
      ...request,
      operationIdOrStatusCode:
        OperationId[request.operationIdOrStatusCode] ||
        request.operationIdOrStatusCode
    });
  }
}
