const decode = require("../../../../build/ipp/simple/decode").default;

test("Create-Job Request with Collection Attributes", () => {
  const data = Buffer.from(
    "010100050000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265653400096d656469612d636f6c00004a0000000a6d656469612d73697a6534000000004a0000000b782d64696d656e73696f6e2100000004000052084a0000000b792d64696d656e73696f6e21000000040000740437000000004a0000000a6d656469612d74797065440000000a73746174696f6e657279370000000003",
    "hex"
  );
  const message = decode(data);
  expect(message).toStrictEqual({
    version: "1.1",
    operationIdOrStatusCode: 0x0005,
    requestId: 0x00000001,
    attributeGroups: [
      {
        groupTag: 0x01,
        attributes: [
          {
            name: "attributes-charset",
            values: [
              {
                valueTag: 0x47,
                value: Buffer.from("utf-8", "utf8")
              }
            ]
          },
          {
            name: "attributes-natural-language",
            values: [
              {
                valueTag: 0x48,
                value: Buffer.from("en-us", "utf8")
              }
            ]
          },
          {
            name: "printer-uri",
            values: [
              {
                valueTag: 0x45,
                value: Buffer.from(
                  "ipp://printer.example.com/ipp/print/pinetree",
                  "utf8"
                )
              }
            ]
          },
          {
            name: "media-col",
            values: [
              {
                valueTag: 0x34,
                value: Buffer.from("", "utf8")
              },
              {
                valueTag: 0x4a,
                value: Buffer.from("media-size", "utf8")
              },
              {
                valueTag: 0x34,
                value: Buffer.from("", "utf8")
              },
              {
                valueTag: 0x4a,
                value: Buffer.from("x-dimension", "utf8")
              },
              {
                valueTag: 0x21,
                value: Buffer.from([0x00, 0x00, 0x52, 0x08])
              },
              {
                valueTag: 0x4a,
                value: Buffer.from("y-dimension", "utf8")
              },
              {
                valueTag: 0x21,
                value: Buffer.from([0x00, 0x00, 0x74, 0x04])
              },
              {
                valueTag: 0x37,
                value: Buffer.from("", "utf8")
              },
              {
                valueTag: 0x4a,
                value: Buffer.from("media-type", "utf8")
              },
              {
                valueTag: 0x44,
                value: Buffer.from("stationery", "utf8")
              },
              {
                valueTag: 0x37,
                value: Buffer.from("", "utf8")
              }
            ]
          }
        ]
      }
    ],
    data: Buffer.from([])
  });
});
