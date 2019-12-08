const encode = require("../../../build/ipp/encode").default;

test("Print-Job Response (Success with Attributes Ignored)", () => {
  const message = {
    type: "IppResponse",
    versionNumber: { major: 0x01, minor: 0x01 },
    statusCode: 0x0001,
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
              valueTag: 0x41,
              nameLength: 0x000e,
              name: "status-message",
              valueLength: 0x002f,
              value: Buffer.from(
                "successful-ok-ignored-or-substituted-attributes",
                "utf8"
              )
            },
            additionalValue: []
          }
        ]
      },
      {
        type: "AttributeGroup",
        beginAttributeGroupTag: 0x05,
        attribute: [
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x21,
              nameLength: 0x0006,
              name: "copies",
              valueLength: 0x0004,
              value: Buffer.from([0x00, 0x00, 0x00, 0x14])
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x10,
              nameLength: 0x0005,
              name: "sides",
              valueLength: 0x0000,
              value: Buffer.from("", "utf8")
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
              name: "job-id",
              valueLength: 0x0004,
              value: Buffer.from([0, 0, 0, 147])
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x45,
              nameLength: 0x0007,
              name: "job-uri",
              valueLength: 0x0030,
              value: Buffer.from(
                "ipp://printer.example.com/ipp/print/pinetree/147",
                "utf8"
              )
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x23,
              nameLength: 0x0009,
              name: "job-state",
              valueLength: 0x0004,
              value: Buffer.from([0x00, 0x00, 0x00, 0x03])
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
  expect(data.toString("hex")).toMatch(
    "010100010000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765002f7375636365737366756c2d6f6b2d69676e6f7265642d6f722d73756273746974757465642d6174747269627574657305210006636f7069657300040000001410000573696465730000022100066a6f622d69640004000000934500076a6f622d75726900306970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652f3134372300096a6f622d737461746500040000000303"
  );
});
