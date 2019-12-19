const decode = require("../../../../build/ipp/simple/decode").default;
const Values = require("../../../../build/ipp/simple/values");

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
            values: [new Values.CharsetValue("utf-8")]
          },
          {
            name: "attributes-natural-language",
            values: [new Values.NaturalLanguageValue("en-us")]
          },
          {
            name: "printer-uri",
            values: [
              new Values.UriValue(
                "ipp://printer.example.com/ipp/print/pinetree"
              )
            ]
          },
          {
            name: "document-uri",
            values: [new Values.UriValue("ftp://foo.example.com/foo")]
          },
          {
            name: "job-name",
            values: [new Values.NameWithoutLanguageValue("foobar")]
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "copies",
            values: [new Values.IntegerValue(0x01)]
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
