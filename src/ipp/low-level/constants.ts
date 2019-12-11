/**
 * +-----------------+------------------------------+
 * | Tag Value (Hex) | Meaning                      |
 * +-----------------+------------------------------+
 * | 0x00            | Reserved                     |
 * | 0x01            | "operation-attributes-tag"   |
 * | 0x02            | "job-attributes-tag"         |
 * | 0x03            | "end-of-attributes-tag"      |
 * | 0x04            | "printer-attributes-tag"     |
 * | 0x05            | "unsupported-attributes-tag" |
 * +-----------------+------------------------------*
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.1
 */
export enum BeginAttributeGroupTag {
  "operationAttributesTag" = 0x01,
  "jobAttributesTag" = 0x02,
  "endOfAttributesTag" = 0x03,
  "printerAttributesTag" = 0x04,
  "unsupportedAttributesTag" = 0x05
}

/**
 * +-----------------+-------------+
 * | Tag Value (Hex) | Meaning     |
 * +-----------------+-------------+
 * | 0x10            | unsupported |
 * | 0x12            | unknown     |
 * | 0x13            | no-value    |
 * +-----------------+-------------+
 *
 * +----------------+--------------------------------------------------+
 * | Tag Value      | Meaning                                          |
 * | (Hex)          |                                                  |
 * +----------------+--------------------------------------------------+
 * | 0x20           | Unassigned integer data type (see IANA IPP       |
 * |                | registry)                                        |
 * | 0x21           | integer                                          |
 * | 0x22           | boolean                                          |
 * | 0x23           | enum                                             |
 * | 0x24-0x2f      | Unassigned integer data types (see IANA IPP      |
 * |                | registry)                                        |
 * +----------------+--------------------------------------------------+
 *
 * +---------------+---------------------------------------------------+
 * | Tag Value     | Meaning                                           |
 * | (Hex)         |                                                   |
 * +---------------+---------------------------------------------------+
 * | 0x30          | octetString with an unspecified format            |
 * | 0x31          | dateTime                                          |
 * | 0x32          | resolution                                        |
 * | 0x33          | rangeOfInteger                                    |
 * | 0x34          | begCollection                                     |
 * | 0x35          | textWithLanguage                                  |
 * | 0x36          | nameWithLanguage                                  |
 * | 0x37          | endCollection                                     |
 * | 0x38-0x3f     | Unassigned octetString data types (see IANA IPP   |
 * |               | registry)                                         |
 * +---------------+---------------------------------------------------+
 *
 * +---------------+---------------------------------------------------+
 * | Tag Value     | Meaning                                           |
 * | (Hex)         |                                                   |
 * +---------------+---------------------------------------------------+
 * | 0x40          | Unassigned character-string data type (see IANA   |
 * |               | IPP registry)                                     |
 * | 0x41          | textWithoutLanguage                               |
 * | 0x42          | nameWithoutLanguage                               |
 * | 0x43          | Unassigned character-string data type (see IANA   |
 * |               | IPP registry)                                     |
 * | 0x44          | keyword                                           |
 * | 0x45          | uri                                               |
 * | 0x46          | uriScheme                                         |
 * | 0x47          | charset                                           |
 * | 0x48          | naturalLanguage                                   |
 * | 0x49          | mimeMediaType                                     |
 * | 0x4a          | memberAttrName                                    |
 * | 0x4b-0x5f     | Unassigned character-string data types (see IANA  |
 * |               | IPP registry)                                     |
 * +---------------+---------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
export enum ValueTag {
  // Out-of-Band Values
  "unsupported" = 0x10,
  "unknown" = 0x12,
  "no-value" = 0x13,
  // Integer Tags
  "integer" = 0x21,
  "boolean" = 0x22,
  "enum" = 0x23,
  // octetString Tags
  "octetString" = 0x30,
  "dateTime" = 0x31,
  "resolution" = 0x32,
  "rangeOfInteger" = 0x33,
  "begCollection" = 0x34,
  "textWithLanguage" = 0x35,
  "nameWithLanguage" = 0x36,
  "endCollection" = 0x37,
  // String Tags
  "textWithoutLanguage" = 0x41,
  "nameWithoutLanguage" = 0x42,
  "keyword" = 0x44,
  "uri" = 0x45,
  "uriScheme" = 0x46,
  "charset" = 0x47,
  "naturalLanguage" = 0x48,
  "mimeMediaType" = 0x49,
  "memberAttrName" = 0x4a
}
