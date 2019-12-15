const ValueType = require("../../../../build/ipp/simple/values").DateTimeValue;

test("encode", () => {
  const data = new ValueType();
  data.dateTime = new Date("2019-12-14T11:43:00.400Z");
  expect(data.value).toStrictEqual(
    Buffer.from("07e30c0e0b2b00042b0000", "hex")
  );
});
test("decode", () => {
  const data = new ValueType();
  data.value = Buffer.from("07e30c0e0b2b00042b0000", "hex");
  expect(data.dateTime.toISOString()).toBe("2019-12-14T11:43:00.400Z");
});
test("default values", () => {
  const data = new ValueType();
  expect(data.dateTime.toISOString()).toBe("1970-01-01T00:00:00.000Z");
  expect(data.value).toStrictEqual(
    Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  );
  expect(data.valueTag).toBe(0x31);
});
