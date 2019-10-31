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
  bodyParser.raw({ inflate: true, type: contentType, limit: "10mb" }),
  (req, res) => {
    const ipp = require("ipp-encoder");
    const request = ipp.request.decode(req.body);
    console.log(
      "--> request",
      JSON.stringify(request, null, 2),
      ipp.request.decode.bytes
    );

    if (request.version.major !== 1) {
      const response = {
        version: { major: 1, minor: 0 },
        requestId: request.requestId,
        statusCode: 0x0503
      };
      console.log("aaaaaa", JSON.stringify(response, null, 2));
      return res.contentType(contentType).send(ipp.response.encode(response));
    }

    switch (request.requestId) {
      case C.PRINT_JOB: {
        const response = {
          version: { major: 1, minor: 0 },
          statusCode: 0,
          requestId: request.requestId,
          groups: [
            {
              tag: 1,
              attributes: [
                { tag: 71, name: "attributes-charset", value: "utf-8" },
                {
                  tag: 72,
                  name: "attributes-natural-language",
                  value: "en-us"
                },
                {
                  tag: 53,
                  name: "status-message",
                  value: { lang: "en-us", value: "successful-ok" }
                }
              ]
            },
            {
              tag: 2,
              attributes: [
                { tag: 33, name: "job-id", value: 1 },
                { tag: 69, name: "job-uri", value: "ipp://localhost:3000/1" },
                { tag: 35, name: "job-state", value: 5 }
              ]
            }
          ]
        };
        return res.contentType(contentType).send(ipp.response.encode(response));
      }
      case C.GET_JOBS: {
        const response = {
          version: { major: 1, minor: 0 },
          statusCode: 0,
          requestId: request.requestId,
          groups: [
            {
              tag: 1,
              attributes: [
                { tag: 71, name: "attributes-charset", value: "utf-8" },
                {
                  tag: 72,
                  name: "attributes-natural-language",
                  value: "en-us"
                },
                {
                  tag: 53,
                  name: "status-message",
                  value: { lang: "en-us", value: "successful-ok" }
                }
              ]
            }
          ]
        };
        return res.contentType(contentType).send(ipp.response.encode(response));
      }
      case C.GET_PRINTER_ATTRIBUTES: {
        const response = {
          version: { major: 1, minor: 0 },
          statusCode: 0,
          requestId: request.requestId,
          groups: [
            {
              tag: 1,
              attributes: [
                { tag: 71, name: "attributes-charset", value: "utf-8" },
                {
                  tag: 72,
                  name: "attributes-natural-language",
                  value: "en-us"
                },
                {
                  tag: 53,
                  name: "status-message",
                  value: { lang: "en-us", value: "successful-ok" }
                }
              ]
            },
            {
              tag: 5,
              attributes: [{ tag: 16, name: "all", value: "unsupported" }]
            },
            {
              tag: 4,
              attributes: [
                {
                  tag: 69,
                  name: "printer-uri-supported",
                  value: "ipp://localhost:3000/"
                },
                { tag: 68, name: "uri-security-supported", value: "none" },
                {
                  tag: 68,
                  name: "uri-authentication-supported",
                  value: "none"
                },
                {
                  tag: 54,
                  name: "printer-name",
                  value: { lang: "en-us", value: "ipp-printer" }
                },
                { tag: 35, name: "printer-state", value: 3 },
                { tag: 68, name: "printer-state-reasons", value: "none" },
                { tag: 68, name: "ipp-versions-supported", value: "1.1" },
                {
                  tag: 35,
                  name: "operations-supported",
                  value: [2, 4, 10, 11, 8, 9]
                },
                { tag: 71, name: "charset-configured", value: "utf-8" },
                { tag: 71, name: "charset-supported", value: "utf-8" },
                {
                  tag: 72,
                  name: "natural-language-configured",
                  value: "en-us"
                },
                {
                  tag: 72,
                  name: "generated-natural-language-supported",
                  value: "en-us"
                },
                {
                  tag: 73,
                  name: "document-format-default",
                  value: "application/postscript"
                },
                {
                  tag: 73,
                  name: "document-format-supported",
                  value: [
                    "text/html",
                    "text/plain",
                    "application/vnd.hp-PCL",
                    "application/octet-stream",
                    "application/pdf",
                    "application/postscript"
                  ]
                },
                { tag: 34, name: "printer-is-accepting-jobs", value: true },
                { tag: 33, name: "queued-job-count", value: 0 },
                {
                  tag: 68,
                  name: "pdl-override-supported",
                  value: "not-attempted"
                },
                { tag: 33, name: "printer-up-time", value: 4 },
                { tag: 49, name: "printer-current-time", value: new Date() },
                {
                  tag: 68,
                  name: "compression-supported",
                  value: ["deflate", "gzip"]
                }
              ]
            }
          ]
        };
        return res.contentType(contentType).send(ipp.response.encode(response));
      }
    }
    return res.status(500).send();
  }
);
app.listen(3000, () => console.log("listening on http://localhost:3000"));

enum C {
  PRINT_JOB = 0x02,
  JOB_ATTRIBUTES_TAG = 0x02,
  GET_JOBS = 0x0a,
  GET_PRINTER_ATTRIBUTES = 0x0b
}
