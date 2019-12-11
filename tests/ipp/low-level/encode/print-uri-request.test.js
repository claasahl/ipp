const encode = require("../../../../build/ipp/low-level/encode").default;

test("Print-URI Request", () => {
  const message = {
    type: "IppMessage",
    versionNumber: { major: 0x01, minor: 0x01 },
    operationIdOrStatusCode: 0x0003,
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
              valueTag: 0x45,
              nameLength: 0x000c,
              name: "document-uri",
              valueLength: 0x0019,
              value: Buffer.from("ftp://foo.example.com/foo", "utf8")
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
              value: Buffer.from("foobar", "utf8")
            },
            additionalValue: []
          }
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
              value: Buffer.from([0x00, 0x00, 0x00, 0x01])
            },
            additionalValue: []
          }
        ]
      }
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from([])
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100030000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e657472656545000c646f63756d656e742d75726900196674703a2f2f666f6f2e6578616d706c652e636f6d2f666f6f4200086a6f622d6e616d650006666f6f62617202210006636f7069657300040000000103"
  );
});
