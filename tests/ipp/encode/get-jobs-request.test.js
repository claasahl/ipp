const encode = require("../../../build/ipp/encode").default;

test("Get-Jobs Request", () => {
  const message = {
    type: "IppRequest",
    versionNumber: {major: 0x01, minor: 0x01},
    operationId: 0x000a,
    requestId: 0x0000007b,
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
                        valueTag: 0x21,
                        nameLength: 0x0005,
                        name: "limit",
                        valueLength: 0x0004,
                        value: 0x00000032,
                    },
                    additionalValue: []
                },
                {
                    type: "Attribute",
                    attributeWithOneValue: {
                        type: "AttributeWithOneValue",
                        valueTag: 0x44,
                        nameLength: 0x0014,
                        name: "requested-attributes",
                        valueLength: 0x0006,
                        value: "job-id",
                    },
                    additionalValue: [
                        {
                            type: "AdditionalValue",
                            valueTag: 0x44,
                            nameLength: 0x0000,
                            valueLength: 0x0008,
                            value: "job-name",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x44,
                            nameLength: 0x0000,
                            valueLength: 0x000f,
                            value: "document-format",
                        }
                    ]
                }
            ]
        }    
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from([])
}


  const data = encode(message);
  expect(data.toString("hex")).toMatchSnapshot();
});
