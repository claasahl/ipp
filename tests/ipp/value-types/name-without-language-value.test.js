const ValueType = require("../../../build/ipp/simple/value-types")
  .NameWithoutLanguageValue;

test("encode", () => {
  const data = new ValueType();
  data.name = "hello world";
  expect(data.value).toStrictEqual(
    Buffer.from("68656c6c6f20776f726c64", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("68656c6c6f20776f726c64", "hex");
  expect(data.name).toBe("hello world");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.name).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x42);
});
