/*
The following is an example of a Print-Job request with "job-name",
"copies", and "sides" specified.  The "ipp-attribute-fidelity"
attribute is set to 'true' so that the print request will fail if the
"copies" or the "sides" attribute is not supported or their values
are not supported.
*/

let offset = 0;
const data = Buffer.alloc(4098);

// Octets; Symbolic Value; Protocol field
// 0x0101; 1.1; version-number
data.writeInt16BE(0x0101, offset);
offset += 2;
//    0x0002; Print-Job; operation-id
data.writeInt16BE(0x0002, offset);
offset += 2;
//    0x00000001; 1; request-id
data.writeInt32BE(0x00000001, offset);
offset += 4;
//    0x01; start operation-attributes; operation-attributes-tag
data.writeInt8(0x01, offset);
offset += 1;
//    0x47; charset type; value-tag
data.writeInt8(0x47, offset);
offset += 1;
//    0x0012; ; name-length
data.writeInt16BE(0x0012, offset);
offset += 2;
//    attributes-charset; attributes-charset; name
data.write("attributes-charset", offset);
offset += 18;
//    0x0005; ; value-length
data.writeInt16BE(0x0005, offset);
offset += 2;
//    utf-8; UTF-8; value
data.write("utf-8", offset);
offset += 5;
//    0x48; natural-language type; value-tag
data.writeInt8(0x48, offset);
offset += 1;
//    0x001b; ; name-length
data.writeInt16BE(0x001b, offset);
offset += 2;
//    attributes-natural-language; attributes-natural-language; name
data.write("attributes-natural-language", offset);
offset += 27;
//    0x0005; ; value-length
data.writeInt16BE(0x0005, offset);
offset += 2;
//    en-us; en-US; value
data.write("en-us", offset);
offset += 5;
//    0x45; uri type; value-tag
data.writeInt8(0x45, offset);
offset += 1;
//    0x000b; ; name-length
data.writeInt16BE(0x000b, offset);
offset += 2;
//    printer-uri; printer-uri; name
data.write("printer-uri", offset);
offset += 0xb;
//    0x002c; ; value-length
data.writeInt16BE(0x002c, offset);
offset += 2;
//    ipp://printer.example.com/ipp/print/pinetree; printer pinetree; value
data.write("ipp://printer.example.com/ipp/print/pinetree", offset);
offset += 0x2c;
//    0x42; nameWithoutLanguage type; value-tag
data.writeInt8(0x42, offset);
offset += 1;
//    0x0008; ; name-length
data.writeInt16BE(0x0008, offset);
offset += 2;
//    job-name; job-name; name
data.write("job-name", offset);
offset += 8;
//    0x0006; ; value-length
data.writeInt16BE(0x0006, offset);
offset += 2;
//    foobar; foobar; value
data.write("foobar", offset);
offset += 6;
//    0x22; boolean type; value-tag
data.writeInt8(0x22, offset);
offset += 1;
//    0x0016; ; name-length
data.writeInt16BE(0x0016, offset);
offset += 2;
//    ipp-attribute-fidelity; ipp-attribute-fidelity; name
data.write("ipp-attribute-fidelity", offset);
offset += 0x16;
//    0x0001; ; value-length
data.writeInt16BE(0x0001, offset);
offset += 2;
//    0x01; true; value
data.writeInt8(0x01, offset);
offset += 1;
//    0x02; start job-attributes; job-attributes-tag
data.writeInt8(0x02, offset);
offset += 1;
//    0x21; integer type; value-tag
data.writeInt8(0x21, offset);
offset += 1;
//    0x0006; ; name-length
data.writeInt16BE(0x0006, offset);
offset += 2;
//    copies; copies; name
data.write("copies", offset);
offset += 6;
//    0x0004; ; value-length
data.writeInt16BE(0x0004, offset);
offset += 2;
//    0x00000014; 20; value
data.writeInt32BE(0x00000014, offset);
offset += 4;
//    0x44; keyword type; value-tag
data.writeInt8(0x44, offset);
offset += 1;
//    0x0005; ; name-length
data.writeInt16BE(0x0005, offset);
offset += 2;
//    sides; sides; name
data.write("sides", offset);
offset += 5;
//    0x0013; ; value-length
data.writeInt16BE(0x0013, offset);
offset += 2;
//    two-sided-long-edge; two-sided-long-edge; value
data.write("two-sided-long-edge", offset);
offset += 0x13;
//    0x03; end-of-attributes; end-of-attributes-tag
data.writeInt8(0x03, offset);
offset += 1;
//    %!PDF...; <PDF Document>; data
data.write("%!PDF...", offset);
offset += 8;

const ipp = require("ipp-encoder");
const request = ipp.request.decode(data, 0, offset);
console.log(JSON.stringify(request, null, 2));
