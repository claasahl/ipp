const { noValue } = require("../../../../build/ipp/simple/constants");

test("default values", () => {
  expect(noValue.value).toStrictEqual(Buffer.from([]));
  expect(noValue.valueTag).toBe(0x13);
});
