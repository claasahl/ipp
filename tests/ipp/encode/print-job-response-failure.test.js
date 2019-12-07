const encode = require("../../../build/ipp/encode").default;

test("Print-Job Response (Failure)", () => {
    const message = {
        type: "IppResponse",
        versionNumber: {major: 0x01, minor: 0x01},
        statusCode: 0x040b,
        requestId: 0x00000001,
        attributeGroup: [
            {
                type: "AttributeGroup",
                beginAttributeGroupTag: 0x01,
                attribute: [
                    {
                        type:"Attribute",
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
                        type:"Attribute",
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
                        type:"Attribute",
                        attributeWithOneValue: {
                            type: "AttributeWithOneValue",
                            valueTag: 0x41,
                            nameLength: 0x000e,
                            name: "status-message",
                            valueLength: 0x002f,
                            value: "client-error-attributes-or-values-not-supported",
                        },
                        additionalValue: []
                    },
                ]
            },
            {
                type: "AttributeGroup",
                beginAttributeGroupTag: 0x05,
                attribute: [
                    {
                        type:"Attribute",
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
                        type:"Attribute",
                        attributeWithOneValue: {
                            type: "AttributeWithOneValue",
                            valueTag: 0x10,
                            nameLength: 0x0005,
                            name: "sides",
                            valueLength: 0x0000,
                            value: ""
                        },
                        additionalValue: []
                    },
                ]
            }
        ],
        endOfAttributesTag: 0x03,
        data: Buffer.from([])
    };

    const data = encode(message);
    expect(data.toString("hex")).toMatchSnapshot();
});
