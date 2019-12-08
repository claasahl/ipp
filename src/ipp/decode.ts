import { Buffer } from "buffer";

import * as types from "./types";

function ippMessage(
  message: Buffer,
  begin?: number,
  end?: number
): types.IppMessage {
  const buffer = message.slice(begin, end);
  return ippRequest(buffer);
}

/**
 * -----------------------------------------------
 * |                  version-number             |   2 bytes  - required
 * -----------------------------------------------
 * |               operation-id (request)        |   2 bytes  - required
 * -----------------------------------------------
 * |                   request-id                |   4 bytes  - required
 * -----------------------------------------------
 * |                 attribute-group             |   n bytes - 0 or more
 * -----------------------------------------------
 * |              end-of-attributes-tag          |   1 byte   - required
 * -----------------------------------------------
 * |                     data                    |   q bytes  - optional
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.1
 */
function ippRequest(
  request: Buffer,
  begin?: number,
  end?: number
): types.IppRequest {
  const buffer = request.slice(begin, end);
  const major = buffer.readIntBE(0, 1);
  const minor = buffer.readIntBE(1, 1);
  const operationId = buffer.readIntBE(2, 2);
  const requestId = buffer.readIntBE(4, 4);

  let offset = 8;
  const attributeGroups: types.AttributeGroup[] = [];
  do {
    let part1;
    try {
      part1 = attributeGroup(buffer, offset);
    } catch (error) {
      break;
    }
    offset += part1.length;
    attributeGroups.push(part1.data);
  } while (offset < buffer.length);

  const endOfAttributesTag = buffer.readIntBE(offset, 1);
  if (endOfAttributesTag !== 3) {
    throw new Error(
      `'endOfAttributesTag' for IppRequest was ${endOfAttributesTag}, but should have been 3`
    );
  }
  const data = buffer.slice(offset + 1);
  return {
    type: "IppRequest",
    versionNumber: { major, minor },
    operationId,
    requestId,
    attributeGroup: attributeGroups,
    endOfAttributesTag,
    data
  };
}

/**
 * -----------------------------------------------
 * |                  version-number             |   2 bytes  - required
 * -----------------------------------------------
 * |               status-code (response)        |   2 bytes  - required
 * -----------------------------------------------
 * |                   request-id                |   4 bytes  - required
 * -----------------------------------------------
 * |                 attribute-group             |   n bytes - 0 or more
 * -----------------------------------------------
 * |              end-of-attributes-tag          |   1 byte   - required
 * -----------------------------------------------
 * |                     data                    |   q bytes  - optional
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.1
 */
function ippResponse(
  response: Buffer,
  begin?: number,
  end?: number
): types.IppResponse {
  const buffer = response.slice(begin, end);
  const major = buffer.readIntBE(0, 1);
  const minor = buffer.readIntBE(1, 1);
  const statusCode = buffer.readIntBE(2, 2);
  const requestId = buffer.readIntBE(4, 4);

  let offset = 8;
  const attributeGroups: types.AttributeGroup[] = [];
  do {
    let part1;
    try {
      part1 = attributeGroup(buffer, offset);
    } catch (error) {
      break;
    }
    offset += part1.length;
    attributeGroups.push(part1.data);
  } while (offset < buffer.length);

  const endOfAttributesTag = buffer.readIntBE(offset, 1);
  if (endOfAttributesTag !== 3) {
    throw new Error(
      `'endOfAttributesTag' for IppResponse was ${endOfAttributesTag}, but should have been 3`
    );
  }
  const data = buffer.slice(offset + 1);
  return {
    type: "IppResponse",
    versionNumber: { major, minor },
    statusCode,
    requestId,
    attributeGroup: attributeGroups,
    endOfAttributesTag,
    data
  };
}

/**
 * -----------------------------------------------
 * |           begin-attribute-group-tag         |  1 byte
 * ----------------------------------------------------------
 * |                   attribute                 |  p bytes |- 0 or more
 * ----------------------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.2
 */
function attributeGroup(
  attributeGroup: Buffer,
  begin?: number,
  end?: number
): { data: types.AttributeGroup; length: number } {
  const buffer = attributeGroup.slice(begin, end);
  const beginAttributeGroupTag = buffer.readIntBE(0, 1);
  if (beginAttributeGroupTag === 0x03) {
    throw new Error("end of attributes (EOA)");
  } else if (beginAttributeGroupTag > 0x0f) {
    throw new Error(
      `'beginAttributeGroupTag' was ${beginAttributeGroupTag}, but should have been between 0x00 (incl.) and 0x0f (incl.)`
    );
  }

  let offset = 1;
  const attributes: types.Attribute[] = [];
  do {
    let part1;
    try {
      part1 = attribute(buffer, offset);
    } catch (error) {
      break;
    }
    offset += part1.length;
    attributes.push(part1.data);
  } while (offset < buffer.length);
  return {
    data: {
      type: "AttributeGroup",
      beginAttributeGroupTag,
      attribute: attributes
    },
    length: offset
  };
}

/**
 * -----------------------------------------------
 * |          attribute-with-one-value           |  q bytes
 * ----------------------------------------------------------
 * |             additional-value                |  r bytes |- 0 or more
 * ----------------------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.3
 */
function attribute(
  attribute: Buffer,
  begin?: number,
  end?: number
): { data: types.Attribute; length: number } {
  const buffer = attribute.slice(begin, end);
  const part1 = attributeWithOneValue(buffer);
  let offset = part1.length;
  const additionalValues: types.AdditionalValue[] = [];
  do {
    let part2;
    try {
      part2 = additionalValue(buffer, offset);
    } catch (error) {
      break;
    }
    offset += part2.length;
    additionalValues.push(part2.data);
  } while (offset < buffer.length);

  return {
    data: {
      type: "Attribute",
      attributeWithOneValue: part1.data,
      additionalValue: additionalValues
    },
    length: offset
  };
}

/**
 * -----------------------------------------------
 * |                   value-tag                 |   1 byte
 * -----------------------------------------------
 * |               name-length  (value is u)     |   2 bytes
 * -----------------------------------------------
 * |                     name                    |   u bytes
 * -----------------------------------------------
 * |              value-length  (value is v)     |   2 bytes
 * -----------------------------------------------
 * |                     value                   |   v bytes
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.4
 */
function attributeWithOneValue(
  attributeWithOneValue: Buffer,
  begin?: number,
  end?: number
): { data: types.AttributeWithOneValue; length: number } {
  const buffer = attributeWithOneValue.slice(begin, end);
  const valueTag = buffer.readIntBE(0, 1);
  const nameLength = buffer.readIntBE(1, 2);
  const name = buffer.slice(3, 3 + nameLength).toString("utf8");
  const valueLength = buffer.readIntBE(3 + nameLength, 2);
  const value = buffer.slice(5 + nameLength, 5 + nameLength + valueLength);
  return {
    data: {
      type: "AttributeWithOneValue",
      valueTag,
      nameLength,
      name,
      valueLength,
      value
    },
    length: 5 + nameLength + valueLength
  };
}

/**
 * -----------------------------------------------
 * |                   value-tag                 |   1 byte
 * -----------------------------------------------
 * |            name-length  (value is 0x0000)   |   2 bytes
 * -----------------------------------------------
 * |              value-length (value is w)      |   2 bytes
 * -----------------------------------------------
 * |                     value                   |   w bytes
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.5
 */
function additionalValue(
  additionalValue: Buffer,
  begin?: number,
  end?: number
): { data: types.AdditionalValue; length: number } {
  const buffer = additionalValue.slice(begin, end);
  const valueTag = buffer.readIntBE(0, 1);
  const nameLength = buffer.readIntBE(1, 2);
  if (nameLength !== 0) {
    throw new Error(
      `'nameLength' for additionalValue was ${nameLength}, but should have been 0`
    );
  }
  const valueLength = buffer.readIntBE(3, 2);
  const value = buffer.slice(5, valueLength);
  return {
    data: { type: "AdditionalValue", valueTag, nameLength, valueLength, value },
    length: 5 + nameLength + valueLength
  };
}

function decode(message: Buffer): types.IppMessage {
  return ippMessage(message);
}
export default decode;
