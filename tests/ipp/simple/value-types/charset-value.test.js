const ValueType = require("../../../../build/ipp/simple/values").CharsetValue;

test("encode", () => {
  const data = new ValueType();
  data.charset = "utf8";
  expect(data.value).toStrictEqual(Buffer.from("75746638", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("75746638", "hex");
  expect(data.charset).toBe("utf8");
});
test("encode (implicit set)", () => {
  const data = new ValueType("utf8");
  expect(data.value).toStrictEqual(Buffer.from("75746638", "hex"));
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("75746638", "hex"));
  expect(data.charset).toBe("utf8");
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.charset).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x47);
});
