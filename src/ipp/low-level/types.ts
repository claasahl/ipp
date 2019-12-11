export interface VersionNumber {
  major: number;
  minor: number;
}

/**
 * -----------------------------------------------
 * |                  version-number             |   2 bytes  - required
 * -----------------------------------------------
 * |               operation-id (request)        |
 * |                      or                     |   2 bytes  - required
 * |               status-code (response)        |
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
export interface IppMessage {
  type: "IppMessage";
  versionNumber: VersionNumber;
  operationIdOrStatusCode: number;
  requestId: number;
  attributeGroup: AttributeGroup[];
  endOfAttributesTag: 0x03;
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
  attribute: Attribute[];
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
  value: Buffer;
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
  value: Buffer;
}
