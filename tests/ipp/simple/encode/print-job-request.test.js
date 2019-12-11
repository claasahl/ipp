const encode = require("../../../../build/ipp/simple/encode").default;

test("Print-Job Request", () => {
  const message = {
    version: "1.1",
    operationIdOrStatusCode: 0x0002,
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
            name: "job-name",
            values: [
              {
                valueTag: 0x42,
                value: Buffer.from("foobar", "utf8")
              }
            ]
          },
          {
            name: "ipp-attribute-fidelity",
            values: [
              {
                valueTag: 0x22,
                value: Buffer.from([0x01])
              }
            ]
          }
        ]
      },
      {
        groupTag: 0x02,
        attributes: [
          {
            name: "copies",
            values: [
              {
                valueTag: 0x21,
                value: Buffer.from([0x00, 0x00, 0x00, 0x14])
              }
            ]
          },
          {
            name: "sides",
            values: [
              {
                valueTag: 0x44,
                value: Buffer.from("two-sided-long-edge", "utf8")
              }
            ]
          }
        ]
      }
    ],
    data: Buffer.from("%!PDF...")
  };

  const data = encode(message);
  expect(data.toString("hex")).toBe(
    "010100020000000101470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650005656e2d757345000b7072696e7465722d757269002c6970703a2f2f7072696e7465722e6578616d706c652e636f6d2f6970702f7072696e742f70696e65747265654200086a6f622d6e616d650006666f6f6261722200166970702d6174747269627574652d666964656c69747900010102210006636f706965730004000000144400057369646573001374776f2d73696465642d6c6f6e672d656467650325215044462e2e2e"
  );
});
