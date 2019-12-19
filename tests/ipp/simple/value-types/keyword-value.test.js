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
test("encode (implicit set)", () => {
  const data = new ValueType("hello world");
  expect(data.value).toStrictEqual(
    Buffer.from("68656c6c6f20776f726c64", "hex")
  );
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("68656c6c6f20776f726c64", "hex"));
  expect(data.keyword).toBe("hello world");
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.keyword).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x44);
});
