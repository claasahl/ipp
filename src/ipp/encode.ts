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
  function isAttributeArray(
    attribute: types.Attribute[] | types.CollectionAttribute[]
  ): attribute is types.Attribute[] {
    return (
      attribute.length > 0 && attributeGroup.attribute[0].type === "Attribute"
    );
  }
  function isCollectionAttributeArray(
    attribute: types.Attribute[] | types.CollectionAttribute[]
  ): attribute is types.CollectionAttribute[] {
    return (
      attribute.length > 0 &&
      attributeGroup.attribute[0].type === "CollectionAttribute"
    );
  }
  const part1 = Buffer.alloc(1);
  part1.writeIntBE(attributeGroup.beginAttributeGroupTag, 0, 1);

  if (isAttributeArray(attributeGroup.attribute)) {
    const part2 = Buffer.concat(attributeGroup.attribute.map(attribute));
    return Buffer.concat([part1, part2]);
  } else if (isCollectionAttributeArray(attributeGroup.attribute)) {
    const part2 = Buffer.concat(
      attributeGroup.attribute.map(collectionAttribute)
    );
    return Buffer.concat([part1, part2]);
  } else {
    return part1;
  }
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
  const v = attributeWithOneValue.valueLength;
  const part1 = Buffer.alloc(5 + u + v);
  part1.writeIntBE(attributeWithOneValue.valueTag, 0, 1);
  part1.writeIntBE(attributeWithOneValue.nameLength, 1, 2);
  part1.write(attributeWithOneValue.name, 3, "utf8");
  part1.writeIntBE(attributeWithOneValue.valueLength, 3 + u, 2);
  if (typeof attributeWithOneValue.value === "string") {
    part1.write(attributeWithOneValue.value, 5 + u, "utf8");
  } else if (typeof attributeWithOneValue.value === "number") {
    part1.writeIntBE(attributeWithOneValue.value, 5 + u, v);
  }
  return part1;
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
  const w = additionalValue.valueLength;
  const part1 = Buffer.alloc(5 + w);
  part1.writeIntBE(additionalValue.valueTag, 0, 1);
  part1.writeIntBE(additionalValue.nameLength, 1, 2);
  part1.writeIntBE(additionalValue.valueLength, 3, 2);
  if (typeof additionalValue.value === "string") {
    part1.write(additionalValue.value, 5, "utf8");
  } else if (typeof additionalValue.value === "number") {
    part1.writeIntBE(additionalValue.value, 5, w);
  }
  return part1;
}

/**
 * -----------------------------------------------
 * |          value-tag (value is 0x34)          |   1 byte
 * -----------------------------------------------
 * |          name-length (value is u)           |   2 bytes
 * -----------------------------------------------
 * |                     name                    |   u bytes
 * -----------------------------------------------
 * |        value-length (value is 0x0000)       |   2 bytes
 * -----------------------------------------------------------
 * |               member-attribute              |   q bytes |-0 or more
 * -----------------------------------------------------------
 * |        end-value-tag (value is 0x37)        |   1 byte
 * -----------------------------------------------
 * |      end-name-length (value is 0x0000)      |   2 bytes
 * -----------------------------------------------
 * |      end-value-length (value is 0x0000)     |   2 bytes
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.6
 */
function collectionAttribute(
  collectionAttribute: types.CollectionAttribute
): Buffer {
  const u = collectionAttribute.name.length;
  const part1 = Buffer.alloc(5 + u);
  part1.writeIntBE(collectionAttribute.valueTag, 0, 1);
  part1.writeIntBE(collectionAttribute.nameLength, 1, 2);
  part1.write(collectionAttribute.name, 3, "utf8");
  part1.writeIntBE(collectionAttribute.valueLength, 3 + u, 2);

  const part2 = Buffer.concat(
    collectionAttribute.memberAttribute.map(memberAttribute)
  );

  const part3 = Buffer.alloc(5);
  part3.writeIntBE(collectionAttribute.endValueTag, 0, 1);
  part3.writeIntBE(collectionAttribute.endNameLength, 1, 2);
  part3.writeIntBE(collectionAttribute.endValueLength, 3, 2);

  return Buffer.concat([part1, part2, part3]);
}

/**
 * -----------------------------------------------
 * |          value-tag (value is 0x4a)          |   1 byte
 * -----------------------------------------------
 * |        name-length (value is 0x0000)        |   2 bytes
 * -----------------------------------------------
 * |          value-length (value is w)          |   2 bytes
 * -----------------------------------------------
 * |             value (member-name)             |   w bytes
 * -----------------------------------------------
 * |               member-value-tag              |   1 byte
 * -----------------------------------------------
 * |        name-length (value is 0x0000)        |   2 bytes
 * -----------------------------------------------
 * |      member-value-length (value is x)       |   2 bytes
 * -----------------------------------------------
 * |                member-value                 |   x bytes
 * -----------------------------------------------
 *
 * https://tools.ietf.org/html/rfc8010#section-3.1.7
 *
 * Note: renamed second "name-length" to "member-name-length" to avoid naming conflict
 */
function memberAttribute(memberAttribute: types.MemberAttribute): Buffer {
  const w = memberAttribute.valueLength;
  const x = memberAttribute.memberValueLength;
  const part1 = Buffer.alloc(10 + w + x);
  part1.writeIntBE(memberAttribute.valueTag, 0, 1);
  part1.writeIntBE(memberAttribute.nameLength, 1, 2);
  part1.writeIntBE(memberAttribute.valueLength, 3, 2);
  part1.write(memberAttribute.value, 5, "utf8");
  part1.writeIntBE(memberAttribute.memberValueTag, 5 + w, 1);
  part1.writeIntBE(memberAttribute.memberNameLength, 6 + w, 2);
  part1.writeIntBE(memberAttribute.memberValueLength, 8 + w, 2);
  part1.write(memberAttribute.memberValue, 10, "utf8");
  return part1;
}

function encode(message: types.IppMessage): Buffer {
  return ippMessage(message);
}
export default encode;
