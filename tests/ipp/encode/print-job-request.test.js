const encode = require("../../../build/ipp/encode").default;

test("Print-Job Request", () => {
  const message = {
    type: "IppRequest",
    versionNumber: { minor: 0x01, major: 0x01 },
    operationId: 0x0002,
    requestId: 0x00000001,
    attributeGroup: [
      {
        type: "AttributeGroup",
        beginAttributeGroupTag: 0x01,
        attribute: [
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x47,
              nameLength: 0x0012,
              name: "attributes-charset",
              valueLength: 0x0005,
              value: "utf-8",
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x48,
              nameLength: 0x001b,
              name: "attributes-natural-language",
              valueLength: 0x0005,
              value: "en-us",
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x45,
              nameLength: 0x000b,
              name: "printer-uri",
              valueLength: 0x002c,
              value: "ipp://printer.example.com/ipp/print/pinetree",
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x42,
              nameLength: 0x0008,
              name: "job-name",
              valueLength: 0x0006,
              value: "foobar",
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x22,
              nameLength: 0x0016,
              name: "ipp-attribute-fidelity",
              valueLength: 0x0001,
              value: 0x01,
            },
            additionalValue: []
          },
        ]
      },
      {
        type: "AttributeGroup",
        beginAttributeGroupTag: 0x02,
        attribute: [
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x21,
              nameLength: 0x0006,
              name: "copies",
              valueLength: 0x0004,
              value: 0x00000014,
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x44,
              nameLength: 0x0005,
              name: "sides",
              valueLength: 0x0013,
              value: "two-sided-long-edge",
            },
            additionalValue: []
          }
        ]
      }
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from("%!PDF...")
  }

  const data = encode(message);
  expect(data.toString("hex")).toMatchSnapshot();
});
