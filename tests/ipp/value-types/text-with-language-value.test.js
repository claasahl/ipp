const ValueType = require("../../../build/ipp/simple/value-types")
  .TextWithLanguageValue;

test("encode", () => {
  const data = new ValueType();
  data.language = "en";
  data.text = "hello world";
  expect(data.value).toStrictEqual(
    Buffer.from("0002656e000b68656c6c6f20776f726c64", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("0002656e000b68656c6c6f20776f726c64", "hex");
  expect(data.language).toBe("en");
  expect(data.text).toBe("hello world");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.language).toBe("");
  expect(data.text).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([0, 0, 0, 0]));
  expect(data.valueTag).toBe(0x35);
});
