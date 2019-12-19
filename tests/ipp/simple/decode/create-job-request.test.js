const decode = require("../../../../build/ipp/simple/decode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;

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
        groupTag: operationAttributesTag,
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
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
