const ValueType = require("../../../../build/ipp/simple/values")
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
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x30);
});
