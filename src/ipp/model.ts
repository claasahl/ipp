namespace IPP {
  //5.1.1. Out-of-Band Values - 'unknown', 'unsupported', and 'no-value'
  //5.1.2. 'text'
  //5.1.2.1. 'textWithoutLanguage'
  //5.1.2.2. 'textWithLanguage'
  //5.1.3. 'name'
  //5.1.3.1. 'nameWithoutLanguage'
  //5.1.3.2. 'nameWithLanguage'
  //5.1.3.3. Matching 'name' Attribute Values
  //5.1.4. 'keyword'
  //5.1.5. 'enum'
  //5.1.6. 'uri'
  //5.1.7. 'uriScheme'
  //5.1.8. 'charset'
  //5.1.9. 'naturalLanguage'
  //5.1.10. 'mimeMediaType' 5.1.10.1. 'application/octet-stream'
  //5.1.11. 'octetString'
  //5.1.12. 'boolean'
  //5.1.13. 'integer'
  //5.1.14. 'rangeOfInteger'
  //5.1.15. 'dateTime'
  //5.1.16. 'resolution'
  //5.1.17. 'collection'
  //5.1.18. '1setOf X'

  /**
   * https://tools.ietf.org/html/rfc8011#section-5.1.2
   */
  type Text = TextWithoutLanguage | TextWithLanguage;
  type TextWithoutLanguage = string;
  type TextWithLanguage = string;

  /**
   * +------------------+----------------------+-------------------------+
   * | Job Attribute    | Printer: Default     | Printer: "Supported     |
   * |                  | Value Attribute      | Values" Attribute       |
   * +------------------+----------------------+-------------------------+
   * | job-priority     | job-priority-default | job-priority-supported  |
   * | (integer 1:100)  | (integer 1:100)      | (integer 1:100)         |
   * +------------------+----------------------+-------------------------+
   * | job-hold-until   | job-hold-until-      | job-hold-until-         |
   * | (type2 keyword | | default (type2       | supported (1setOf       |
   * | name)            | keyword | name)      | (type2 keyword | name)) |
   * +------------------+----------------------+-------------------------+
   * | job-sheets       | job-sheets-default   | job-sheets-supported    |
   * | (type2 keyword | | (type2 keyword |     | (1setOf (type2 keyword  |
   * | name)            | name)                | | name))                |
   * +------------------+----------------------+-------------------------+
   * | multiple-        | multiple-document-   | multiple-document-      |
   * | document-        | handling-default     | handling-supported      |
   * | handling (type2  | (type2 keyword)      | (1setOf type2 keyword)  |
   * | keyword)         |                      |                         |
   * +------------------+----------------------+-------------------------+
   * | copies           | copies-default       | copies-supported        |
   * | (integer(1:MAX)) | (integer(1:MAX))     | (rangeOfInteger(1:MAX)) |
   * +------------------+----------------------+-------------------------+
   * | finishings       | finishings-default   | finishings-supported    |
   * | (1setOf type2    | (1setOf type2 enum)  | (1setOf type2 enum)     |
   * | enum)            |                      |                         |
   * +------------------+----------------------+-------------------------+
   * | page-ranges      | No                   | page-ranges-supported   |
   * | (1setOf          |                      | (boolean)               |
   * | rangeOfInteger   |                      |                         |
   * | (1:MAX))         |                      |                         |
   * +------------------+----------------------+-------------------------+
   * | sides (type2     | sides-default (type2 | sides-supported (1setOf |
   * | keyword)         | keyword)             | type2 keyword)          |
   * +------------------+----------------------+-------------------------+
   * | number-up        | number-up-default    | number-up-supported     |
   * | (integer(1:MAX)) | (integer(1:MAX))     | (1setOf                 |
   * |                  |                      | (integer(1:MAX) |       |
   * |                  |                      | rangeOfInteger(1:MAX))) |
   * +------------------+----------------------+-------------------------+
   * | orientation-     | orientation-         | orientation-requested-  |
   * | requested (type2 | requested-default    | supported (1setOf type2 |
   * | enum)            | (type2 enum)         | enum)                   |
   * +------------------+----------------------+-------------------------+
   * | media (type2     | media-default (type2 | media-supported (1setOf |
   * | keyword | name)  | keyword | name)      | (type2 keyword | name)) |
   * |                  |                      | media-ready (1setOf     |
   * |                  |                      | (type2 keyword | name)) |
   * +------------------+----------------------+-------------------------+
   * | printer-         | printer-resolution-  | printer-resolution-     |
   * | resolution       | default (resolution) | supported (1setOf       |
   * | (resolution)     |                      | resolution)             |
   * +------------------+----------------------+-------------------------+
   * | print-quality    | print-quality-       | print-quality-supported |
   * | (type2 enum)     | default (type2 enum) | (1setOf type2 enum)     |
   * +------------------+----------------------+-------------------------+
   *
   * https://tools.ietf.org/html/rfc8011#section-5.2
   */

  interface JobTemplate {}
  const defaultJobTemplate: JobTemplate = {};
  const supported = {};

  /**
   * +------------------+----------------+-----------+
   * | Attribute        | Syntax         | REQUIRED? |
   * +------------------+----------------+-----------+
   * | job-impressions  | integer(0:MAX) |           |
   * +------------------+----------------+-----------+
   * | job-k-octets     | integer(0:MAX) |           |
   * +------------------+----------------+-----------+
   * | job-media-sheets | integer(1:MAX) |           |
   * +------------------+----------------+-----------+
   * | job-name         | name(MAX)      | REQUIRED  |
   * +------------------+----------------+-----------+
   *
   * https://tools.ietf.org/html/rfc8011#section-5.3
   */
  interface JobDescription {}

  /**
   * +-----------------------------+-------------------------+-----------+
   * | Attribute                   | Syntax                  | REQUIRED? |
   * +-----------------------------+-------------------------+-----------+
   * | attributes-charset          | charset                 | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | attributes-natural-language | naturalLanguage         | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | date-time-at-completed      | dateTime|unknown|no-    |           |
   * |                             | value                   |           |
   * +-----------------------------+-------------------------+-----------+
   * | date-time-at-creation       | dateTime|unknown        |           |
   * +-----------------------------+-------------------------+-----------+
   * | date-time-at-processing     | dateTime|unknown|no-    |           |
   * |                             | value                   |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-detailed-status-        | 1setOf text(MAX)        |           |
   * | messages                    |                         |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-document-access-errors  | 1setOf text(MAX)        |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-id                      | integer(1:MAX)          | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-impressions-completed   | integer(0:MAX)          |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-k-octets-processed      | integer(0:MAX)          |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-media-sheets-completed  | integer(0:MAX)          |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-message-from-operator   | text(127)               |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-more-info               | uri                     |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-originating-user-name   | name(MAX)               | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-printer-up-time         | integer(1:MAX)          | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-printer-uri             | uri                     | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-state                   | type1 enum              | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-state-message           | text(MAX)               |           |
   * +-----------------------------+-------------------------+-----------+
   * | job-state-reasons           | 1setOf type2 keyword    | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | job-uri                     | uri                     | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | number-of-documents         | integer(0:MAX)          |           |
   * +-----------------------------+-------------------------+-----------+
   * | number-of-intervening-jobs  | integer(0:MAX)          |           |
   * +-----------------------------+-------------------------+-----------+
   * | output-device-assigned      | name(127)               |           |
   * +-----------------------------+-------------------------+-----------+
   * | time-at-completed           | integer(MIN:MAX)        | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | time-at-creation            | integer(MIN:MAX)        | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   * | time-at-processing          | integer(MIN:MAX)        | REQUIRED  |
   * +-----------------------------+-------------------------+-----------+
   *
   * https://tools.ietf.org/html/rfc8011#section-5.3
   */
  interface JobStatusAttributes {}

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
}
