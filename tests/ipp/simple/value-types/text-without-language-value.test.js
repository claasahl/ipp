const ValueType = require("../../../../build/ipp/simple/values")
  .TextWithoutLanguageValue;

test("encode", () => {
  const data = new ValueType();
  data.text = "hello world";
  expect(data.value).toStrictEqual(
    Buffer.from("68656c6c6f20776f726c64", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("68656c6c6f20776f726c64", "hex");
  expect(data.text).toBe("hello world");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.text).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x41);
});
