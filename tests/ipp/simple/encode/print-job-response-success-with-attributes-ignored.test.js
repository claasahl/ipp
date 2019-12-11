const encode = require("../../../../build/ipp/simple/encode").default;

test("Print-Job Response (Success with Attributes Ignored)", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x0001,
    requestId: 0x00000001,
    attributeGroups: [
      {
        groupTag: 0x01,
        attributes: [
          {
            name: "attributes-charset",
            value: {
              valueTag: 0x47,
              value: Buffer.from("utf-8", "utf8")
            },
            additionalValues: []
          },
          {
            name: "attributes-natural-language",
            value: {
              valueTag: 0x48,
              value: Buffer.from("en-us", "utf8")
            },
            additionalValues: []
          },
          {
            name: "status-message",
            value: {
              valueTag: 0x41,
              value: Buffer.from(
                "successful-ok-ignored-or-substituted-attributes",
                "utf8"
              )
            },
            additionalValues: []
          }
        ]
      },
      {
        groupTag: 0x05,
        attributes: [
          {
            name: "copies",
            value: {
              valueTag: 0x21,
              value: Buffer.from([0x00, 0x00, 0x00, 0x14])
            },
            additionalValues: []
          },
          {
            name: "sides",
            value: {
              valueTag: 0x10,
              value: Buffer.from("", "utf8")
            },
            additionalValues: []
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "job-id",
            value: {
              valueTag: 0x21,
              value: Buffer.from([0, 0, 0, 147])
            },
            additionalValues: []
          },
          {
            name: "job-uri",
            value: {
              valueTag: 0x45,
              value: Buffer.from(
                "ipp://printer.example.com/ipp/print/pinetree/147",
                "utf8"
              )
            },
            additionalValues: []
          },
          {
            name: "job-state",
            value: {
              valueTag: 0x23,
              value: Buffer.from([0x00, 0x00, 0x00, 0x03])
            },
            additionalValues: []
          }
        ]
      }
    ],
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100010000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765002f7375636365737366756c2d6f6b2d69676e6f7265642d6f722d73756273746974757465642d6174747269627574657305210006636f7069657300040000001410000573696465730000022100066a6f622d69640004000000934500076a6f622d75726900306970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652f3134372300096a6f622d737461746500040000000303"
  );
});
