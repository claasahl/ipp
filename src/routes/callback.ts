import { Request, Response, NextFunction } from "express";
import { types } from "scrive-open-api";

import logger from "../logger";

async function handler(req: Request, res: Response, _next: NextFunction) {
  try {
    const body = req.body as types.PayloadCallback;
    const document = JSON.parse(body.document_json);
    res.status(200).json(document);
  } catch (error) {
    logger.error("error while processing callback from scrive", { error });
    res.status(error.http_code || 400).send(error);
  }
}
export default handler;
