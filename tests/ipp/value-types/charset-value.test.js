const ValueType = require("../../../build/ipp/simple/value-types").CharsetValue;

test("encode", () => {
  const data = new ValueType();
  data.charset = "utf8";
  expect(data.value).toStrictEqual(Buffer.from("75746638", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("75746638", "hex");
  expect(data.charset).toBe("utf8");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.charset).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x47);
});
