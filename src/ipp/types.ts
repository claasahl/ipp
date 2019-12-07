export type IppMessage = IppRequest | IppResponse;

export interface VersionNumber {
  major: number;
  minor: number;
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
export interface IppRequest {
  type: "IppRequest";
  versionNumber: VersionNumber;
  operationId: number;
  requestId: number;
  attributeGroup: AttributeGroup[];
  endOfAttributesTag: 3;
  data: Buffer;
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
export interface IppResponse {
  type: "IppResponse";
  versionNumber: VersionNumber;
  statusCode: number;
  requestId: number;
  attributeGroup: AttributeGroup[];
  endOfAttributesTag: number;
  data: Buffer;
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
export interface AttributeGroup {
  type: "AttributeGroup";
  beginAttributeGroupTag: number;
  attribute: Attribute[] | CollectionAttribute[];
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
export interface Attribute {
  type: "Attribute";
  attributeWithOneValue: AttributeWithOneValue;
  additionalValue: AdditionalValue[];
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
export interface AttributeWithOneValue {
  type: "AttributeWithOneValue";
  valueTag: number;
  nameLength: number;
  name: string;
  valueLength: number;
  value: string | number;
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
export interface AdditionalValue {
  type: "AdditionalValue";
  valueTag: number;
  nameLength: 0x0;
  valueLength: number;
  value: string | number;
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
export interface CollectionAttribute {
  type: "CollectionAttribute";
  valueTag: 0x34;
  nameLength: number;
  name: string;
  valueLength: 0x0;
  memberAttribute: MemberAttribute[];
  endValueTag: 0x37;
  endNameLength: 0x0;
  endValueLength: 0x0;
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
export interface MemberAttribute {
  type: "MemberAttribute";
  valueTag: 0x4a;
  nameLength: 0x0;
  valueLength: number;
  value: string;
  memberValueTag: number;
  memberNameLength: 0x0;
  memberValueLength: number;
  memberValue: string;
}
