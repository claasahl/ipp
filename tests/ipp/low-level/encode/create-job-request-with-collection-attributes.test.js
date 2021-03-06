const encode = require("../../../../build/ipp/low-level/encode").default;

test("Create-Job Request with Collection Attributes", () => {
  const message = {
    type: "IppMessage",
    versionNumber: { major: 0x01, minor: 0x01 },
    operationIdOrStatusCode: 0x0005,
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
              value: Buffer.from("utf-8", "utf8")
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
              value: Buffer.from("en-us", "utf8")
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
              value: Buffer.from(
                "ipp://printer.example.com/ipp/print/pinetree",
                "utf8"
              )
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x34,
              nameLength: 0x0009,
              name: "media-col",
              valueLength: 0x0000,
              value: Buffer.from("", "utf8")
            },
            additionalValue: [
              {
                type: "AdditionalValue",
                valueTag: 0x4a,
                nameLength: 0x0000,
                valueLength: 0x000a,
                value: Buffer.from("media-size", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x34,
                nameLength: 0x0000,
                valueLength: 0x0000,
                value: Buffer.from("", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x4a,
                nameLength: 0x0000,
                valueLength: 0x000b,
                value: Buffer.from("x-dimension", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x21,
                nameLength: 0x0000,
                valueLength: 0x0004,
                value: Buffer.from([0x00, 0x00, 0x52, 0x08])
              },
              {
                type: "AdditionalValue",
                valueTag: 0x4a,
                nameLength: 0x0000,
                valueLength: 0x000b,
                value: Buffer.from("y-dimension", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x21,
                nameLength: 0x0000,
                valueLength: 0x0004,
                value: Buffer.from([0x00, 0x00, 0x74, 0x04])
              },
              {
                type: "AdditionalValue",
                valueTag: 0x37,
                nameLength: 0x0000,
                valueLength: 0x0000,
                value: Buffer.from("", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x4a,
                nameLength: 0x0000,
                valueLength: 0x000a,
                value: Buffer.from("media-type", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x44,
                nameLength: 0x0000,
                valueLength: 0x000a,
                value: Buffer.from("stationery", "utf8")
              },
              {
                type: "AdditionalValue",
                valueTag: 0x37,
                nameLength: 0x0000,
                valueLength: 0x0000,
                value: Buffer.from("", "utf8")
              }
            ]
          }
        ]
      }
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100050000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265653400096d656469612d636f6c00004a0000000a6d656469612d73697a6534000000004a0000000b782d64696d656e73696f6e2100000004000052084a0000000b792d64696d656e73696f6e21000000040000740437000000004a0000000a6d656469612d74797065440000000a73746174696f6e657279370000000003"
  );
});
