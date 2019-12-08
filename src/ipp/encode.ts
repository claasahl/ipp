import { Buffer } from "buffer";

import * as types from "./types";

function ippMessage(message: types.IppMessage): Buffer {
  switch (message.type) {
    case "IppRequest":
      return ippRequest(message);
    case "IppResponse":
      return ippResponse(message);
    default:
      // unknown type of message... silently ignore and pray :P
      return Buffer.from([]);
  }
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
function ippRequest(request: types.IppRequest): Buffer {
  const part1 = Buffer.alloc(8);
  part1.writeIntBE(request.versionNumber.major, 0, 1);
  part1.writeIntBE(request.versionNumber.minor, 1, 1);
  part1.writeIntBE(request.operationId, 2, 2);
  part1.writeIntBE(request.requestId, 4, 4);

  const part2 = Buffer.concat(request.attributeGroup.map(attributeGroup));

  const part3 = Buffer.alloc(1);
  part3.writeIntBE(request.endOfAttributesTag, 0, 1);
  return Buffer.concat([part1, part2, part3, request.data]);
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
function ippResponse(response: types.IppResponse): Buffer {
  const part1 = Buffer.alloc(8);
  part1.writeIntBE(response.versionNumber.major, 0, 1);
  part1.writeIntBE(response.versionNumber.minor, 1, 1);
  part1.writeIntBE(response.statusCode, 2, 2);
  part1.writeIntBE(response.requestId, 4, 4);

  const part2 = Buffer.concat(response.attributeGroup.map(attributeGroup));

  const part3 = Buffer.alloc(1);
  part3.writeIntBE(response.endOfAttributesTag, 0, 1);
  return Buffer.concat([part1, part2, part3, response.data]);
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
function attributeGroup(attributeGroup: types.AttributeGroup): Buffer {
  const part1 = Buffer.alloc(1);
  part1.writeIntBE(attributeGroup.beginAttributeGroupTag, 0, 1);

  const part2 = Buffer.concat(attributeGroup.attribute.map(attribute));
  return Buffer.concat([part1, part2]);
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
function attribute(attribute: types.Attribute): Buffer {
  const part1 = attributeWithOneValue(attribute.attributeWithOneValue);
  const part2 = Buffer.concat(attribute.additionalValue.map(additionalValue));
  return Buffer.concat([part1, part2]);
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
  attributeWithOneValue: types.AttributeWithOneValue
): Buffer {
  const u = attributeWithOneValue.nameLength;
  const part1 = Buffer.alloc(3 + u);
  part1.writeIntBE(attributeWithOneValue.valueTag, 0, 1);
  part1.writeIntBE(attributeWithOneValue.nameLength, 1, 2);
  part1.write(attributeWithOneValue.name, 3, u, "utf8");

  const part2 = Buffer.alloc(2);
  part2.writeIntBE(attributeWithOneValue.valueLength, 0, 2);

  const v = attributeWithOneValue.valueLength;
  const part3 = attributeWithOneValue.value.slice(0, v);
  return Buffer.concat([part1, part2, part3]);
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
function additionalValue(additionalValue: types.AdditionalValue): Buffer {
  const part1 = Buffer.alloc(5);
  part1.writeIntBE(additionalValue.valueTag, 0, 1);
  part1.writeIntBE(additionalValue.nameLength, 1, 2);
  part1.writeIntBE(additionalValue.valueLength, 3, 2);

  const w = additionalValue.valueLength;
  const part2 = additionalValue.value.slice(0, w);
  return Buffer.concat([part1, part2]);
}

function encode(message: types.IppMessage): Buffer {
  return ippMessage(message);
}
export default encode;
