const ValueType = require("../../../../build/ipp/simple/values").KeywordValue;

test("encode", () => {
  const data = new ValueType();
  data.keyword = "hello world";
  expect(data.value).toStrictEqual(
    Buffer.from("68656c6c6f20776f726c64", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("68656c6c6f20776f726c64", "hex");
  expect(data.keyword).toBe("hello world");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.keyword).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x44);
});
