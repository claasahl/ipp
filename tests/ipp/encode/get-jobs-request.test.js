const encode = require("../../../build/ipp/encode").default;

test("Get-Jobs Request", () => {
  const message = {
    type: "IppRequest",
    versionNumber: { major: 0x01, minor: 0x01 },
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
              value: "utf-8"
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
              value: "en-us"
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
              value: "ipp://printer.example.com/ipp/print/pinetree"
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
              value: 0x00000032
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
              value: "job-id"
            },
            additionalValue: [
              {
                type: "AdditionalValue",
                valueTag: 0x44,
                nameLength: 0x0000,
                valueLength: 0x0008,
                value: "job-name"
              },
              {
                type: "AdditionalValue",
                valueTag: 0x44,
                nameLength: 0x0000,
                valueLength: 0x000f,
                value: "document-format"
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
  expect(data.toString("hex")).toMatch(
    "0101000a0000007b01470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265652100056c696d69740004000000324400147265717565737465642d6174747269627574657300066a6f622d696444000000086a6f622d6e616d65440000000f646f63756d656e742d666f726d617403"
  );
});