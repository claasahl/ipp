const decode = require("../../../../build/ipp/simple/decode").default;

test("Print-URI Request", () => {
  const data = Buffer.from(
    "010100030000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e657472656545000c646f63756d656e742d75726900196674703a2f2f666f6f2e6578616d706c652e636f6d2f666f6f4200086a6f622d6e616d650006666f6f62617202210006636f7069657300040000000103",
    "hex"
  );
  const message = decode(data);
  expect(message).toStrictEqual({
    version: "1.1",
    operationIdOrStatusCode: 0x0003,
    requestId: 0x00000001,
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
            name: "document-uri",
            values: [
              {
                valueTag: 0x45,
                value: Buffer.from("ftp://foo.example.com/foo", "utf8")
              }
            ]
          },
          {
            name: "job-name",
            values: [
              {
                valueTag: 0x42,
                value: Buffer.from("foobar", "utf8")
              }
            ]
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "copies",
            values: [
              {
                valueTag: 0x21,
                value: Buffer.from([0x00, 0x00, 0x00, 0x01])
              }
            ]
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
