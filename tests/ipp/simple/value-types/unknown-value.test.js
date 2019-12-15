const ValueType = require("../../../../build/ipp/simple/values").UnknownValue;

test("constant value", () => {
  const data = new ValueType();
  expect(() => (data.value = Buffer.from("01", "hex"))).toThrow(
    /must not be changed/
  );
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x12);
});
