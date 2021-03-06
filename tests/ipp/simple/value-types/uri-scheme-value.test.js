const ValueType = require("../../../../build/ipp/simple/values").UriSchemeValue;

test("encode", () => {
  const data = new ValueType();
  data.uriScheme = "ipps";
  expect(data.value).toStrictEqual(Buffer.from("69707073", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("69707073", "hex");
  expect(data.uriScheme).toBe("ipps");
});
test("encode (implicit set)", () => {
  const data = new ValueType("ipps");
  expect(data.value).toStrictEqual(Buffer.from("69707073", "hex"));
});
test("decode (implicit set)", () => {
  const data = new ValueType(Buffer.from("69707073", "hex"));
  expect(data.uriScheme).toBe("ipps");
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.uriScheme).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x46);
});
