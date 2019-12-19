const ValueType = require("../../../../build/ipp/simple/values")
  .NaturalLanguageValue;

test("encode", () => {
  const data = new ValueType();
  data.language = "en";
  expect(data.value).toStrictEqual(Buffer.from("656e", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("656e", "hex");
  expect(data.language).toBe("en");
});
test("encode (implicit set)", () => {
  const data = new ValueType("en");
  expect(data.value).toStrictEqual(Buffer.from("656e", "hex"));
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("656e", "hex"));
  expect(data.language).toBe("en");
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.language).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x48);
});
