const ValueType = require("../../../build/ipp/simple/value-types")
  .OctetStringValue;

test("encode", () => {
  const data = new ValueType();
  data.value = Buffer.from("0000002a", "hex");
  expect(data.value).toStrictEqual(Buffer.from("0000002a", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("0000002a", "hex");
  expect(data.value).toStrictEqual(Buffer.from("0000002a", "hex"));
});
test("default values", () => {
  const data = new ValueType();
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x30);
});
