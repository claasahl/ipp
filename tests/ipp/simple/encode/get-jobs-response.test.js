const encode = require("../../../../build/ipp/simple/encode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag,
  jobAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;
const {
  successfulOk
} = require("../../../../build/ipp/simple/constants").StatusCode;

test("Get-Jobs Response", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: successfulOk,
    requestId: 0x0000007b,
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
            name: "job-name",
            values: [new Values.NameWithLanguageValue("fr-ca", "fou")]
          }
        ]
      },
      {
        groupTag: jobAttributesTag,
        attributes: []
      },
      {
        groupTag: jobAttributesTag,
        attributes: [
          {
            name: "job-id",
            values: [new Values.IntegerValue(148)]
          },
          {
            name: "job-name",
            values: [new Values.NameWithLanguageValue("de-CH", "isch guet")]
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
