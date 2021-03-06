const encode = require("../../../../build/ipp/simple/encode").default;
const Values = require("../../../../build/ipp/simple/values");
const {
  operationAttributesTag,
  jobAttributesTag
} = require("../../../../build/ipp/simple/constants").BeginAttributeGroupTag;

test("Print-Job Request", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x0002,
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
          },
          {
            name: "job-name",
            values: [new Values.NameWithoutLanguageValue("foobar")]
          },
          {
            name: "ipp-attribute-fidelity",
            values: [new Values.BooleanValue(true)]
          }
        ]
      },
      {
        groupTag: jobAttributesTag,
        attributes: [
          {
            name: "copies",
            values: [new Values.IntegerValue(0x14)]
          },
          {
            name: "sides",
            values: [new Values.KeywordValue("two-sided-long-edge")]
          }
        ]
      }
    ],
    data: Buffer.from("%!PDF...")
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100020000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265654200086a6f622d6e616d650006666f6f6261722200166970702d6174747269627574652d666964656c69747900010102210006636f706965730004000000144400057369646573001374776f2d73696465642d6c6f6e672d656467650325215044462e2e2e"
  );
});
