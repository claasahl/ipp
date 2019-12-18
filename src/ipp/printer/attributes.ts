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
  charsetConfigured: undefined,
  charsetSupported: undefined,
  compressionSupported: undefined,
  documentFormatDefault: undefined,
  documentFormatSupported: undefined,
  generatedNaturalLanguageSupported: undefined,
  ippVersionsSupported: undefined,
  naturalLanguageConfigured: undefined,
  operationsSupported: undefined,
  pdlOverrideSupported: undefined,
  printerName: undefined
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
  printerIsAcceptingJobs: undefined,
  printerState: undefined,
  printerStateReasons: undefined,
  printerUpTime: undefined,
  printerUriSupported: undefined,
  queuedJobCount: undefined,
  uriAuthenticationSupported: undefined,
  uriSecuritySupported: undefined
};
