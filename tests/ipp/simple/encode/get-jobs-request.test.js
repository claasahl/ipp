const encode = require("../../../../build/ipp/simple/encode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;

test("Get-Jobs Request", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x000a,
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
            name: "printer-uri",
            values: [
              new Values.UriValue(
                "ipp://printer.example.com/ipp/print/pinetree"
              )
            ]
          },
          {
            name: "limit",
            values: [new Values.IntegerValue(0x32)]
          },
          {
            name: "requested-attributes",
            values: [
              new Values.KeywordValue("job-id"),
              new Values.KeywordValue("job-name"),
              new Values.KeywordValue("document-format")
            ]
          }
        ]
      }
    ],
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "0101000a0000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652100056c696d69740004000000324400147265717565737465642d6174747269627574657300066a6f622d696444000000086a6f622d6e616d65440000000f646f63756d656e742d666f726d617403"
  );
});
