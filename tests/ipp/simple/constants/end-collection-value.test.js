const { endCollection } = require("../../../../build/ipp/simple/constants");

test("default values", () => {
  expect(endCollection.value).toStrictEqual(Buffer.from([]));
  expect(endCollection.valueTag).toBe(0x37);
});
