const encode = require("../../../../build/ipp/simple/encode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag,
  unsupportedAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;

test("Print-Job Response (Failure)", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x040b,
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
            values: [
              new Values.TextWithoutLanguageValue(
                "client-error-attributes-or-values-not-supported"
              )
            ]
          }
        ]
      },
      {
        groupTag: unsupportedAttributesTag,
        attributes: [
          {
            name: "copies",
            values: [new Values.IntegerValue(0x14)]
          },
          {
            name: "sides",
            values: [new Values.UnsupportedValue()]
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
