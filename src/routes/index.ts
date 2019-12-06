import express from "express";
import bodyParser from "body-parser";

import callback from "./callback";

const app = express.Router();
app.get("/", (_req, res) => res.sendStatus(200));
app.post("/callback", bodyParser.urlencoded({ extended: true }), callback);
export default app;
