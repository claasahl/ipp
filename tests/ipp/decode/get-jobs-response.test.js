const decode = require("../../../build/ipp/decode").default;

test("Get-Jobs Response", () => {
  const data = Buffer.from(
    "010100000000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757341000e7374617475732d6d657373616765000d7375636365737366756c2d6f6b022100066a6f622d69640004000000933600086a6f622d6e616d65000c000566722d63610003666f7502022100066a6f622d69640004000000943600086a6f622d6e616d650012000564652d4348000969736368206775657403",
    "hex"
  );
  const message = decode(data, false);
  expect(message).toStrictEqual({
    type: "IppResponse",
    versionNumber: { major: 0x01, minor: 0x01 },
    statusCode: 0x0000,
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
              valueLength: 0x000d,
              value: Buffer.from("successful-ok", "utf8")
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
              valueTag: 0x36,
              nameLength: 0x0008,
              name: "job-name",
              valueLength: 0x000c,
              value: Buffer.concat([
                Buffer.from([0x00, 0x05]),
                Buffer.from("fr-ca", "utf8"),
                Buffer.from([0x00, 0x03]),
                Buffer.from("fou", "utf8")
              ])
            },
            additionalValue: []
          }
        ]
      },
      {
        type: "AttributeGroup",
        beginAttributeGroupTag: 0x02,
        attribute: []
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
              value: Buffer.from([0, 0, 0, 148])
            },
            additionalValue: []
          },
          {
            type: "Attribute",
            attributeWithOneValue: {
              type: "AttributeWithOneValue",
              valueTag: 0x36,
              nameLength: 0x0008,
              name: "job-name",
              valueLength: 0x0012,
              value: Buffer.concat([
                Buffer.from([0x00, 0x05]),
                Buffer.from("de-CH", "utf8"),
                Buffer.from([0x00, 0x09]),
                Buffer.from("isch guet", "utf8")
              ])
            },
            additionalValue: []
          }
        ]
      }
    ],
    endOfAttributesTag: 0x03,
    data: Buffer.from([])
  });
});
