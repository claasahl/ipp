import decodeRaw from "../low-level/decode";
import * as types from "../low-level/types";
import {
  Message,
  Attribute,
  AttributeGroup,
  Value,
  VersionNumber
} from "./types";
import * as Values from "./values";
import { unknownValue, noValue, unsupportedValue } from "./constants";

function decodeMessage(message: types.IppMessage): Message {
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
  switch (valueTag) {
    case Values.UnsupportedValue.prototype.valueTag:
      return unsupportedValue;
    case Values.UnknownValue.prototype.valueTag:
      return unknownValue;
    case Values.NoValue.prototype.valueTag:
      return noValue;
    case Values.TextWithoutLanguageValue.prototype.valueTag:
      return new Values.TextWithoutLanguageValue(v);
    case Values.NameWithoutLanguageValue.prototype.valueTag:
      return new Values.NameWithoutLanguageValue(v);
    case Values.TextWithLanguageValue.prototype.valueTag:
      return new Values.TextWithLanguageValue(v); //-- not in test cases
    case Values.NameWithLanguageValue.prototype.valueTag:
      return new Values.NameWithLanguageValue(v);
    case Values.CharsetValue.prototype.valueTag:
      return new Values.CharsetValue(v);
    case Values.NaturalLanguageValue.prototype.valueTag:
      return new Values.NaturalLanguageValue(v);
    case Values.MimeMediaTypeValue.prototype.valueTag:
      return new Values.MimeMediaTypeValue(v); //-- not in test cases
    case Values.KeywordValue.prototype.valueTag:
      return new Values.KeywordValue(v);
    case Values.UriValue.prototype.valueTag:
      return new Values.UriValue(v);
    case Values.UriSchemeValue.prototype.valueTag:
      return new Values.UriSchemeValue(v); //-- not in test cases
    case Values.BooleanValue.prototype.valueTag:
      return new Values.BooleanValue(v);
    case Values.IntegerValue.prototype.valueTag:
      return new Values.IntegerValue(v);
    case Values.EnumValue.prototype.valueTag:
      return new Values.EnumValue(v);
    case Values.DateTimeValue.prototype.valueTag:
      return new Values.DateTimeValue(v); //-- not in test cases
    case Values.ResolutionValue.prototype.valueTag:
      return new Values.ResolutionValue(v); //-- not in test cases
    case Values.RangeOfIntegerValue.prototype.valueTag:
      return new Values.RangeOfIntegerValue(v); //-- not in test cases
    case Values.OctetStringValue.prototype.valueTag:
      return new Values.OctetStringValue(v); //-- not in test cases
    default:
      return { value: v, valueTag };
  }
}

export function decode(message: Buffer): Message {
  const ippMessage = decodeRaw(message);
  return decodeMessage(ippMessage);
}
export default decode;
