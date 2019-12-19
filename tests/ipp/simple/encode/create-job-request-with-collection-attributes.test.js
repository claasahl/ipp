const encode = require("../../../../build/ipp/simple/encode").default;
const Values = require("../../../../build/ipp/simple/values");

test("Create-Job Request with Collection Attributes", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x0005,
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
            name: "media-col",
            values: [
              new Values.BegCollectionValue(),
              new Values.MemberAttrNameValue("media-size"),
              new Values.BegCollectionValue(),
              new Values.MemberAttrNameValue("x-dimension"),
              new Values.IntegerValue(21000),
              new Values.MemberAttrNameValue("y-dimension"),
              new Values.IntegerValue(29700),
              new Values.EndCollectionValue(),
              new Values.MemberAttrNameValue("media-type"),
              new Values.KeywordValue("stationery"),
              new Values.EndCollectionValue()
            ]
          }
        ]
      }
    ],
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100050000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265653400096d656469612d636f6c00004a0000000a6d656469612d73697a6534000000004a0000000b782d64696d656e73696f6e2100000004000052084a0000000b792d64696d656e73696f6e21000000040000740437000000004a0000000a6d656469612d74797065440000000a73746174696f6e657279370000000003"
  );
});
