import * as Values from "../simple";

/**
 * +-----------------------------+-----------------------+-------------+
 * | Attribute                   | Syntax                | REQUIRED?   |
 * +-----------------------------+-----------------------+-------------+
 * | charset-configured          | charset               | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | charset-supported           | 1setOf charset        | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | color-supported             | boolean               | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | compression-supported       | 1setOf type2 keyword  | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | document-format-default     | mimeMediaType         | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | document-format-supported   | 1setOf mimeMediaType  | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | generated-natural-language- | 1setOf                | REQUIRED    |
 * | supported                   | naturalLanguage       |             |
 * +-----------------------------+-----------------------+-------------+
 * | ipp-versions-supported      | 1setOf type2 keyword  | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | job-impressions-supported   | rangeOfInteger(0:MAX) | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | job-k-octets-supported      | rangeOfInteger(0:MAX) |             |
 * +-----------------------------+-----------------------+-------------+
 * | job-media-sheets-supported  | rangeOfInteger(1:MAX) |             |
 * +-----------------------------+-----------------------+-------------+
 * | multiple-document-jobs-     | boolean               | RECOMMENDED |
 * | supported                   |                       |             |
 * +-----------------------------+-----------------------+-------------+
 * | multiple-operation-time-out | integer(1:MAX)        | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | natural-language-configured | naturalLanguage       | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | operations-supported        | 1setOf type2 enum     | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | pdl-override-supported      | type2 keyword         | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | printer-driver-installer    | uri                   |             |
 * +-----------------------------+-----------------------+-------------+
 * | printer-info                | text(127)             | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | printer-location            | text(127)             | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | printer-make-and-model      | text(127)             | RECOMMENDED |
 * +-----------------------------+-----------------------+-------------+
 * | printer-message-from-       | text(127)             |             |
 * | operator                    |                       |             |
 * +-----------------------------+-----------------------+-------------+
 * | printer-more-info-          | uri                   |             |
 * | manufacturer                |                       |             |
 * +-----------------------------+-----------------------+-------------+
 * | printer-name                | name(127)             | REQUIRED    |
 * +-----------------------------+-----------------------+-------------+
 * | reference-uri-schemes-      | 1setOf uriScheme      |             |
 * | supported                   |                       |             |
 * +-----------------------------+-----------------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4
 */
export const readWrite = {
  charsetConfigured: [new Values.CharsetValue("utf-8")],
  charsetSupported: [new Values.CharsetValue("utf-8")],
  compressionSupported: [new Values.KeywordValue("none")],
  documentFormatDefault: [new Values.MimeMediaTypeValue("")],
  documentFormatSupported: [
    new Values.MimeMediaTypeValue("application/postscript")
  ],
  generatedNaturalLanguageSupported: [new Values.NaturalLanguageValue("en-us")],
  ippVersionsSupported: [new Values.KeywordValue("1.1")],
  naturalLanguageConfigured: [new Values.NaturalLanguageValue("en-us")],
  operationsSupported: [
    new Values.EnumValue(0x0002),
    new Values.EnumValue(0x0004),
    new Values.EnumValue(0x000a),
    new Values.EnumValue(0x000b),
    new Values.EnumValue(0x0008),
    new Values.EnumValue(0x0009)
  ],
  pdlOverrideSupported: [new Values.KeywordValue("not-attempted")],
  printerName: [new Values.NameWithoutLanguageValue("mr. printer")]
};

/**
 * +------------------------------+----------------------+-------------+
 * | Attribute                    | Syntax               | REQUIRED?   |
 * +------------------------------+----------------------+-------------+
 * | pages-per-minute-color       | integer(0:MAX)       | RECOMMENDED |
 * +------------------------------+----------------------+-------------+
 * | pages-per-minute             | integer(0:MAX)       | RECOMMENDED |
 * +------------------------------+----------------------+-------------+
 * | printer-current-time         | dateTime|unknown     | RECOMMENDED |
 * +------------------------------+----------------------+-------------+
 * | printer-is-accepting-jobs    | boolean              | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | printer-more-info            | uri                  | RECOMMENDED |
 * +------------------------------+----------------------+-------------+
 * | printer-state                | type1 enum           | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | printer-state-message        | text(MAX)            | RECOMMENDED |
 * +------------------------------+----------------------+-------------+
 * | printer-state-reasons        | 1setOf type2 keyword | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | printer-up-time              | integer(1:MAX)       | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | printer-uri-supported        | 1setOf uri           | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | queued-job-count             | integer(0:MAX)       | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | uri-authentication-supported | 1setOf type2 keyword | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 * | uri-security-supported       | 1setOf type2 keyword | REQUIRED    |
 * +------------------------------+----------------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4
 */
export const readOnly = {
  printerIsAcceptingJobs: [new Values.BooleanValue(true)],
  printerState: [new Values.EnumValue(3)],
  printerStateReasons: [new Values.KeywordValue("none")],
  printerUpTime: [new Values.IntegerValue(420)],
  printerUriSupported: [new Values.UriValue("http://localhost:3000")],
  queuedJobCount: [new Values.IntegerValue(1)],
  uriAuthenticationSupported: [new Values.KeywordValue("none")],
  uriSecuritySupported: [new Values.KeywordValue("none")]
};
