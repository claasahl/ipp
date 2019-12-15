const ValueType = require("../../../../build/ipp/simple/values")
  .RangeOfIntegerValue;

test("encode", () => {
  const data = new ValueType();
  data.lowerBound = 5;
  data.upperBound = 42;
  expect(data.value).toStrictEqual(Buffer.from("000000050000002a", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("000000050000002a", "hex");
  expect(data.lowerBound).toBe(5);
  expect(data.upperBound).toBe(42);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.lowerBound).toBe(0);
  expect(data.upperBound).toBe(0);
  expect(data.value).toStrictEqual(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]));
  expect(data.valueTag).toBe(0x33);
});
