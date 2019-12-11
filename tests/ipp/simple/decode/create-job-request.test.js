const decode = require("../../../../build/ipp/simple/decode").default;

test("Create-Job Request", () => {
  const data = Buffer.from(
    "010100050000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e657472656503",
    "hex"
  );
  const message = decode(data);
  expect(message).toStrictEqual({
    version: "1.1",
    operationIdOrStatusCode: 0x0005,
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
            name: "printer-uri",
            value: {
              valueTag: 0x45,
              value: Buffer.from(
                "ipp://printer.example.com/ipp/print/pinetree",
                "utf8"
              )
            },
            additionalValues: []
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
