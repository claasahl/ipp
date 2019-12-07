const encode = require("../../../build/ipp/encode").default;

test("Create-Job Request with Collection Attributes", () => {
  const message = {
    type: "IppRequest",
    versionNumber: { major: 0x01, minor: 0x01 },
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
                // {
                //     type: "Attribute",
                //     attributeWithOneValue: {

                //         type: "CollectionAttribute",
                //         valueTag: 0x34,
                //         nameLength: 0x0009,
                //         name: "media-col",
                //         valueLength: 0x0000,
                //         memberAttribute: [
                //             {
                //                 type: "MemberAttribute",
                //                 valueTag: 0x4a,
                //                 nameLength: 0x0000,
                //                 valueLength: 0x000a,
                //                 value: "media-size",
                //                 memberValueTag: 0x34,
                //                 memberNameLength: 0x0000,
                //                 memberValueLength: 0x0000,
                //                 memberValue: ""
                //             },
                //             {
                //                 type: "MemberAttribute",
                //                 valueTag: 0x4a,
                //                 nameLength: 0x0000,
                //                 valueLength: 0x000b,
                //                 value: "x-dimension",
                //                 memberValueTag: 0x21,
                //                 memberNameLength: 0x0000,
                //                 memberValueLength: 0x0004,
                //                 memberValue: 0x00005208,
                //             },
                //             {
                //                 type: "MemberAttribute",
                //                 valueTag: 0x4a,
                //                 nameLength: 0x0000,
                //                 valueLength: 0x000b,
                //                 value: "y-dimension",
                //                 memberValueTag: 0x21,
                //                 memberNameLength: 0x0000,
                //                 memberValueLength: 0x0004,
                //                 memberValue: 0x00007404,
                //             },
                //             {
                //                 type: "",
                //                 endValueTag: 0x37,
                //                 endNameLength: 0x0000,
                //                 endValueLength: 0x0000,
                //             },
                //             {
                //                 type: "MemberAttribute",
                //                 valueTag: 0x4a,
                //                 nameLength: 0x0000,
                //                 valueLength: 0x000a,
                //                 value: "media-type",
                //                 memberValueTag: 0x44,
                //                 memberNameLength: 0x0000,
                //                 memberValueLength: 0x000a,
                //                 memberValue: "stationery",
                //             }
                //         ],
                //         endValueTag: 0x37,
                //         endNameLength: 0x0000,
                //         endValueLength: 0x0000,
                //     },
                //     additionalValue: []
                // },
                {
                    type: "Attribute",
                    attributeWithOneValue: {
                        type: "AttributeWithOneValue",
                        valueTag: 0x34,
                        nameLength: 0x0009,
                        name: "media-col",
                        valueLength: 0x0000,
                        value: ""
                    },
                    additionalValue: [
                        {
                            type: "AdditionalValue",
                            valueTag: 0x4a,
                            nameLength: 0x0000,
                            valueLength: 0x000a,
                            value: "media-size",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x34,
                            nameLength: 0x0000,
                            valueLength: 0x0000,
                            value: ""
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x4a,
                            nameLength: 0x0000,
                            valueLength: 0x000b,
                            value: "x-dimension",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x21,
                            nameLength: 0x0000,
                            valueLength: 0x0004,
                            value: 0x00005208,
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x4a,
                            nameLength: 0x0000,
                            valueLength: 0x000b,
                            value: "y-dimension",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x21,
                            nameLength: 0x0000,
                            valueLength: 0x0004,
                            value: 0x00007404,
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x37,
                            nameLength: 0x0000,
                            valueLength: 0x0000,
                            value: ""
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x4a,
                            nameLength: 0x0000,
                            valueLength: 0x000a,
                            value: "media-type",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x44,
                            nameLength: 0x0000,
                            valueLength: 0x000a,
                            value: "stationery",
                        },
                        {
                            type: "AdditionalValue",
                            valueTag: 0x37,
                            nameLength: 0x0000,
                            valueLength: 0x0000,
                            value: ""
                        },
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
