const encode = require("../../../build/ipp/encode").default;

test("Get-Jobs Response", () => {
    const message = {
        type: "IppResponse",
        versionNumber: {major: 0x01, minor: 0x01},
        statusCode: 0x0000,
        requestId: 0x0000007b,
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
                            valueLength: 0x000d,
                            value: "successful-ok",
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
                        type:"Attribute",
                        attributeWithOneValue: {
                            type: "AttributeWithOneValue",
                            valueTag: 0x21,
                            nameLength: 0x0006,
                            name: "job-id",
                            valueLength: 0x0004,
                            value: 147,
                        },
                        additionalValue: []
                    },
                    // {
                    //     type:"Attribute",
                    //     attributeWithOneValue: {
                    //         type: "AttributeWithOneValue",
                    //         valueTag: 0x36,
                    //         nameLength: 0x0008,
                    //         name: "job-name",
                    //         valueLength: 0x000c,
                    //         subValueLength: 0x0005,
                    //         value: "fr-ca",
                    //         subValueLength: 0x0003,
                    //         name: "fou",
                    //     },
                    //     additionalValue: []
                    // },
                ]
            },
            {
                type:"AttributeGroup",
                beginAttributeGroupTag: 0x02,
                attribute: [   ]
            },
            {
                type: "AttributeGroup",
                beginAttributeGroupTag: 0x02,
                attribute: [
                    {
                        type:"Attribute",
                        attributeWithOneValue: {
                            type: "AttributeWithOneValue",
                            valueTag: 0x21,
                            nameLength: 0x0006,
                            name: "job-id",
                            valueLength: 0x0004,
                            value: 148,
                        },
                        additionalValue: []
                    },
                    // {
                    //     type:"Attribute",
                    //     attributeWithOneValue: {
                    //         type: "AttributeWithOneValue",
                    //         valueTag: 0x36,
                    //         nameLength: 0x0008,
                    //         name: "job-name",
                    //         valueLength: 0x0012,
                    //         subValueLength: 0x0005,
                    //         value: "de-CH",
                    //         subValueLength: 0x0009,
                    //         name: "isch guet",
                    //     },
                    //     additionalValue: [
                    //         {
                    //             type: "AdditionalValue",
                    //         }
                    //     ]
                    // },
                ]
            }
        ],
        endOfAttributesTag: 0x03,
        data: Buffer.from([])
    }    

    const data = encode(message);
    expect(data.toString("hex")).toMatchSnapshot();
});
