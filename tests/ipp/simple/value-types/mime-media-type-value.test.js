const ValueType = require("../../../../build/ipp/simple/values")
  .MimeMediaTypeValue;

test("encode", () => {
  const data = new ValueType();
  data.mimeMediaType = "text/plain";
  expect(data.value).toStrictEqual(Buffer.from("746578742f706c61696e", "hex"));
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("746578742f706c61696e", "hex");
  expect(data.mimeMediaType).toBe("text/plain");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.mimeMediaType).toBe("");
  expect(data.value).toStrictEqual(Buffer.from([]));
  expect(data.valueTag).toBe(0x49);
});
