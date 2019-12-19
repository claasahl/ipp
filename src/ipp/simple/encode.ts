import encodeRaw from "../low-level/encode";
import * as types from "../low-level/types";
import { Message, Attribute, AttributeGroup } from "./types";
import { BeginAttributeGroupTag } from "../low-level/constants";

function encodeMessage(message: Message): types.IppMessage {
  const {
    version,
    requestId,
    operationIdOrStatusCode,
    attributeGroups,
    data = Buffer.alloc(0)
  } = message;
  const major = version === "2.0" ? 2 : 1;
  const minor = version === "1.1" ? 1 : 0;
  return {
    type: "IppMessage",
    versionNumber: {
      major,
      minor
    },
    operationIdOrStatusCode,
    requestId,
    attributeGroup: attributeGroups.map(attributeGroup),
    endOfAttributesTag: BeginAttributeGroupTag.endOfAttributesTag,
    data
  };
}
function attributeGroup(attributeGroup: AttributeGroup): types.AttributeGroup {
  const { groupTag, attributes } = attributeGroup;
  return {
    type: "AttributeGroup",
    beginAttributeGroupTag: groupTag,
    attribute: attributes.map(attribute)
  };
}
function attribute(attribute: Attribute): types.Attribute {
  const { name, values } = attribute;
  const [{ value, valueTag }, ...additionalValues] = values;
  return {
    type: "Attribute",
    attributeWithOneValue: {
      type: "AttributeWithOneValue",
      valueTag,
      nameLength: name.length,
      name: name,
      valueLength: value.length,
      value: value
    },
    additionalValue: additionalValues.map(({ valueTag, value }) => ({
      type: "AdditionalValue",
      valueTag,
      nameLength: 0,
      valueLength: value.length,
      value
    }))
  };
}

export function encode(message: Message): Buffer {
  const ippMessage = encodeMessage(message);
  return encodeRaw(ippMessage);
}
export default encode;
