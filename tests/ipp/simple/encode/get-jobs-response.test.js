const encode = require("../../../../build/ipp/simple/encode").default;

test("Get-Jobs Response", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x0000,
    requestId: 0x0000007b,
    attributeGroups: [
      {
        groupTag: 0x01,
        attributes: [
          {
            name: "attributes-charset",
            values: [
              {
                valueTag: 0x47,
                value: Buffer.from("utf-8", "utf8")
              }
            ]
          },
          {
            name: "attributes-natural-language",
            values: [
              {
                valueTag: 0x48,
                value: Buffer.from("en-us", "utf8")
              }
            ]
          },
          {
            name: "status-message",
            values: [
              {
                valueTag: 0x41,
                value: Buffer.from("successful-ok", "utf8")
              }
            ]
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "job-id",
            values: [
              {
                valueTag: 0x21,
                value: Buffer.from([0, 0, 0, 147])
              }
            ]
          },
          {
            name: "job-name",
            values: [
              {
                valueTag: 0x36,
                value: Buffer.concat([
                  Buffer.from([0x00, 0x05]),
                  Buffer.from("fr-ca", "utf8"),
                  Buffer.from([0x00, 0x03]),
                  Buffer.from("fou", "utf8")
                ])
              }
            ]
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: []
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "job-id",
            values: [
              {
                valueTag: 0x21,
                value: Buffer.from([0, 0, 0, 148])
              }
            ]
          },
          {
            name: "job-name",
            values: [
              {
                valueTag: 0x36,
                value: Buffer.concat([
                  Buffer.from([0x00, 0x05]),
                  Buffer.from("de-CH", "utf8"),
                  Buffer.from([0x00, 0x09]),
                  Buffer.from("isch guet", "utf8")
                ])
              }
            ]
          }
        ]
      }
    ],
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100000000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765000d7375636365737366756c2d6f6b022100066a6f622d69640004000000933600086a6f622d6e616d65000c000566722d63610003666f7502022100066a6f622d69640004000000943600086a6f622d6e616d650012000564652d4348000969736368206775657403"
  );
});
