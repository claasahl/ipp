const ValueType = require("../../../../build/ipp/simple/values").UriValue;

test("encode", () => {
  const data = new ValueType();
  data.uri = "ipps://localhost";
  expect(data.value).toStrictEqual(
    Buffer.from("697070733a2f2f6c6f63616c686f7374", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("697070733a2f2f6c6f63616c686f7374", "hex");
  expect(data.uri).toBe("ipps://localhost");
});
test("constant valueTag", () => {
  const data = new ValueType();
  expect(() => (data.valueTag = 42)).toThrow(/must not be changed/);
});
test("default values", () => {
  const data = new ValueType();
  expect(data.uri).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x45);
});
