const { begCollection } = require("../../../../build/ipp/simple/constants");

test("default values", () => {
  expect(begCollection.value).toStrictEqual(Buffer.from([]));
  expect(begCollection.valueTag).toBe(0x34);
});
