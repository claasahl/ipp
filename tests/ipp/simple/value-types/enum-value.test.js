const ValueType = require("../../../../build/ipp/simple/values").EnumValue;

test("encode", () => {
  const data = new ValueType();
  data.enum = 42;
  expect(data.value).toStrictEqual(Buffer.from("0000002a", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("0000002a", "hex");
  expect(data.enum).toBe(42);
});
test("encode (implicit set)", () => {
  const data = new ValueType(42);
  expect(data.value).toStrictEqual(Buffer.from("0000002a", "hex"));
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("0000002a", "hex"));
  expect(data.enum).toBe(42);
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.enum).toBe(0);
  expect(data.value).toStrictEqual(Buffer.from([0, 0, 0, 0]));
  expect(data.valueTag).toBe(0x23);
});
