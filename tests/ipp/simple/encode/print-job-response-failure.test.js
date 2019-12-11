const encode = require("../../../../build/ipp/simple/encode").default;

test("Print-Job Response (Failure)", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x040b,
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
                "client-error-attributes-or-values-not-supported",
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
      }
    ],
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "0101040b0000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765002f636c69656e742d6572726f722d617474726962757465732d6f722d76616c7565732d6e6f742d737570706f7274656405210006636f706965730004000000141000057369646573000003"
  );
});
