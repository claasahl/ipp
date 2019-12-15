const ValueType = require("../../../../build/ipp/simple/values").BooleanValue;

test("encode", () => {
  const data = new ValueType();
  data.flag = true;
  expect(data.value).toStrictEqual(Buffer.from("01", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("01", "hex");
  expect(data.flag).toBe(true);
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.flag).toBe(false);
  expect(data.value).toStrictEqual(Buffer.from([0]));
  expect(data.valueTag).toBe(0x22);
});
