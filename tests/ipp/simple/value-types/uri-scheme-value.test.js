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
test("default values", () => {
  const data = new ValueType();
  expect(data.uriScheme).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x46);
});
