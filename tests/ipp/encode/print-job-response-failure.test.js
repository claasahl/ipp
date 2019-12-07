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
    expect(data.toString("hex")).toMatch("0101040b0000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765002f636c69656e742d6572726f722d617474726962757465732d6f722d76616c7565732d6e6f742d737570706f7274656405210006636f706965730004000000141000057369646573000003");
});
