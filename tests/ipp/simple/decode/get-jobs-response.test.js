const decode = require("../../../../build/ipp/simple/decode").default;
const Values = require("../../../../build/ipp/simple/values");

test("Get-Jobs Response", () => {
  const data = Buffer.from(
    "010100000000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765000d7375636365737366756c2d6f6b022100066a6f622d69640004000000933600086a6f622d6e616d65000c000566722d63610003666f7502022100066a6f622d69640004000000943600086a6f622d6e616d650012000564652d4348000969736368206775657403",
    "hex"
  );
  const message = decode(data);
  expect(message).toStrictEqual({
    version: "1.1",
    operationIdOrStatusCode: 0x0000,
    requestId: 0x0000007b,
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
            name: "status-message",
            values: [new Values.TextWithoutLanguageValue("successful-ok")]
          }
        ]
      },
      {
        groupTag: 0x02,
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
        groupTag: 0x02,
        attributes: []
      },
      {
        groupTag: 0x02,
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
  });
});
