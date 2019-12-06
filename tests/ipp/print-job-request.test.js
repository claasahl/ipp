const fs = require("fs");

const encode = require("../../build/ipp/encode").default;

test("adds 1 + 2 to equal 3", () => {
  const data = encode({
    type: "IppRequest",
    versionNumber: { major: 0x1, minor: 0x1 },
    operationId: 0x2,
    requestId: 0x1,
    attributeGroup: [
      {
        type: "AttributeGroup",
        beginAttributeGroupTag: 0x1,
        attribute: [
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x47,
              nameLength: 0x12,
              name: "attributes-charset",
              valueLength: 0x5,
              value: "utf-8"
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x48,
              nameLength: 0x1b,
              name: "attributes-natural-language",
              valueLength: 0x5,
              value: "en-us"
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x45,
              nameLength: 0xb,
              name: "printer-uri",
              valueLength: 0x2c,
              value: "ipp://printer.example.com/ipp/print/pinetree"
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x42,
              nameLength: 0x8,
              name: "job-name",
              valueLength: 0x6,
              value: "foobar"
            },
            additionalValue: [
              {
                type: ""
              }
            ]
          }
        ]
      }
    ],
    endOfAttributesTag: 3,
    data: Buffer.from("%!PDF...")
  });
  expect(data.toString("hex")).toMatchSnapshot();
});
