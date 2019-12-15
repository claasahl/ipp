const ValueType = require("../../../../build/ipp/simple/values").IntegerValue;

test("encode", () => {
  const data = new ValueType();
  data.integer = 42;
  expect(data.value).toStrictEqual(Buffer.from("0000002a", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("0000002a", "hex");
  expect(data.integer).toBe(42);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.integer).toBe(0);
  expect(data.value).toStrictEqual(Buffer.from([0, 0, 0, 0]));
  expect(data.valueTag).toBe(0x21);
});
