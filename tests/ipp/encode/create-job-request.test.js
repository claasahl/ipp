const encode = require("../../../build/ipp/encode").default;

test("Create-Job Request", () => {
  const message = {
    type: "IppRequest",
    versionNumber: { major: 0x01, minor: 0x01},
    operationId: 0x0005,
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
            ]
        }
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from([])
}

  const data = encode(message);
  expect(data.toString("hex")).toMatchSnapshot();
});
