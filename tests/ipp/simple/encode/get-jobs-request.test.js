const encode = require("../../../../build/ipp/simple/encode").default;

test("Get-Jobs Request", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x000a,
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
            name: "printer-uri",
            values: [
              {
                valueTag: 0x45,
                value: Buffer.from(
                  "ipp://printer.example.com/ipp/print/pinetree",
                  "utf8"
                )
              }
            ]
          },
          {
            name: "limit",
            values: [
              {
                valueTag: 0x21,
                value: Buffer.from([0x00, 0x00, 0x00, 0x32])
              }
            ]
          },
          {
            name: "requested-attributes",
            values: [
              {
                valueTag: 0x44,
                value: Buffer.from("job-id", "utf8")
              },
              {
                valueTag: 0x44,
                value: Buffer.from("job-name", "utf8")
              },
              {
                valueTag: 0x44,
                value: Buffer.from("document-format", "utf8")
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
    "0101000a0000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652100056c696d69740004000000324400147265717565737465642d6174747269627574657300066a6f622d696444000000086a6f622d6e616d65440000000f646f63756d656e742d666f726d617403"
  );
});
