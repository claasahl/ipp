import express from "express";
import bodyParser from "body-parser";

const contentType = "application/ipp";

const app = express();
app.use((req, res, next) => {
  if (req.header("content-type") !== contentType) {
    return res.status(400).send();
  }
  next();
});
app.post(
  "/",
  bodyParser.raw({ inflate: true, type: contentType }),
  (req, res) => {
    const ipp = require("ipp-encoder");
    const request = ipp.request.decode(req.body);
    console.log("--> request", JSON.stringify(request, null, 2));

    if (request.version.major !== 1) {
      const response = {
        version: { major: 1, minor: 0 },
        requestId: request.requestId,
        statusCode: 0x0503
      };
      console.log("aaaaaa", JSON.stringify(response, null, 2));
      return res.contentType(contentType).send(ipp.response.encode(response));
    }

    if (request.requestId === C.GET_PRINTER_ATTRIBUTES) {
      const response = {
        version: { major: 1, minor: 0 },
        requestId: request.requestId,
        statusCode: 0,
        groups: request.groups
      };
      console.log("bbbbbbbbbbb", JSON.stringify(response, null, 2));
      return res.contentType(contentType).send(ipp.response.encode(response));
    }
    return res.status(500).send();
  }
);
app.listen(3000, () => console.log("listening on http://localhost:3000"));

enum C {
  GET_PRINTER_ATTRIBUTES = 0x0b
}
