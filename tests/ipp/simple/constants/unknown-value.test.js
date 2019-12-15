const { unknownValue } = require("../../../../build/ipp/simple/constants");

test("default values", () => {
  expect(unknownValue.value).toStrictEqual(Buffer.from([]));
  expect(unknownValue.valueTag).toBe(0x12);
});
