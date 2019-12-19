const decode = require("../../../../build/ipp/simple/decode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag,
  jobAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;

test("Print-Job Response (Successful)", () => {
  const data = Buffer.from(
    "010100000000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765000d7375636365737366756c2d6f6b022100066a6f622d69640004000000934500076a6f622d75726900306970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652f3134372300096a6f622d737461746500040000000303",
    "hex"
  );
  const message = decode(data);
  expect(message).toStrictEqual({
    version: "1.1",
    operationIdOrStatusCode: 0x0000,
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
            name: "status-message",
            values: [new Values.TextWithoutLanguageValue("successful-ok")]
          }
        ]
      },
      {
        groupTag: jobAttributesTag,
        attributes: [
          {
            name: "job-id",
            values: [new Values.IntegerValue(147)]
          },
          {
            name: "job-uri",
            values: [
              new Values.UriValue(
                "ipp://printer.example.com/ipp/print/pinetree/147"
              )
            ]
          },
          {
            name: "job-state",
            values: [new Values.EnumValue(0x03)]
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
