const ValueType = require("../../../build/ipp/simple/value-types")
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
test("default values", () => {
  const data = new ValueType();
  expect(data.language).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x48);
});
