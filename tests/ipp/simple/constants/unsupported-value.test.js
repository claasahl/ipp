const { unsupportedValue } = require("../../../../build/ipp/simple/constants");

test("default values", () => {
  expect(unsupportedValue.value).toStrictEqual(Buffer.from([]));
  expect(unsupportedValue.valueTag).toBe(0x10);
});
