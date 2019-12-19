import decodeRaw from "../low-level/decode";
import * as types from "../low-level/types";
import {
  Message,
  Attribute,
  AttributeGroup,
  Value,
  VersionNumber
} from "./types";

function message2(message: types.IppMessage): Message {
  const { versionNumber, requestId, operationIdOrStatusCode, data } = message;
  let version: VersionNumber;
  switch (`${versionNumber.major}.${versionNumber.minor}`) {
    case "1.0":
      version = "1.0";
      break;
    case "1.1":
      version = "1.1";
      break;
    case "2.0":
      version = "2.0";
      break;
    default:
      throw new Error("invalid version number");
  }
  return {
    version,
    operationIdOrStatusCode,
    requestId,
    attributeGroups: message.attributeGroup.map(attributeGroup),
    data
  };
}
function attributeGroup(attributeGroup: types.AttributeGroup): AttributeGroup {
  const { beginAttributeGroupTag } = attributeGroup;
  return {
    groupTag: beginAttributeGroupTag,
    attributes: attributeGroup.attribute.map(attribute)
  };
}
function attribute(attribute: types.Attribute): Attribute {
  // TODO consider validating nameLength
  const { name } = attribute.attributeWithOneValue;
  return {
    name,
    values: [attribute.attributeWithOneValue, ...attribute.additionalValue].map(
      value
    )
  };
}

function value(
  value: types.AttributeWithOneValue | types.AdditionalValue
): Value {
  // TODO consider validating valueLength and nameLength
  const { value: v, valueTag } = value;
  return { value: v, valueTag };
}

export function decode(message: Buffer): Message {
  const ippMessage = decodeRaw(message);
  return message2(ippMessage);
}
export default decode;
