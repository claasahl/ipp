const ValueType = require("../../../../build/ipp/simple/values")
  .ResolutionValue;

test("encode", () => {
  const data = new ValueType();
  data.crossFeed = 5;
  data.feed = 42;
  data.units = 3;
  expect(data.value).toStrictEqual(Buffer.from("000000050000002a03", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("000000050000002a03", "hex");
  expect(data.crossFeed).toBe(5);
  expect(data.feed).toBe(42);
  expect(data.units).toBe(3);
});
test("encode (implicit set)", () => {
  const data = new ValueType(5, 42, 3);
  expect(data.value).toStrictEqual(Buffer.from("000000050000002a03", "hex"));
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("000000050000002a03", "hex"));
  expect(data.crossFeed).toBe(5);
  expect(data.feed).toBe(42);
  expect(data.units).toBe(3);
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.crossFeed).toBe(0);
  expect(data.feed).toBe(0);
  expect(data.units).toBe(0);
  expect(data.value).toStrictEqual(Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]));
  expect(data.valueTag).toBe(0x32);
});
