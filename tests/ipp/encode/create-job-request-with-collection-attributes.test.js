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
  expect(data.toString("hex")).toMatch("010100050000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265653400096d656469612d636f6c00004a0000000a6d656469612d73697a6534000000004a0000000b782d64696d656e73696f6e2100000004000052084a0000000b792d64696d656e73696f6e21000000040000740437000000004a0000000a6d656469612d74797065440000000a73746174696f6e657279370000000003");
});
