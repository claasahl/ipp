import * as Values from "../simple";

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
export const readWrite = {
  jobName: [new Values.NameWithoutLanguageValue("mr. job")]
};

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
export const readOnly = {
  attributesCharset: [new Values.CharsetValue("utf-8")],
  attributesNaturalLanguage: [new Values.NaturalLanguageValue("en-us")],
  jobId: [new Values.IntegerValue(42)],
  jobOriginatingUserName: [new Values.NameWithoutLanguageValue("mr. user")],
  jobPrinterUpTime: [new Values.IntegerValue(420)],
  jobPrinterUri: [new Values.UriValue("http://localhost:3000")],
  jobState: [new Values.EnumValue(3)],
  jobStateReasons: [new Values.KeywordValue("none")],
  jobUri: [new Values.UriValue("http://localhost:3000/jobs/42")],
  timeAtCompleted: [new Values.NoValue()],
  timeAtCreation: [new Values.IntegerValue(23)],
  timeAtProcessing: [new Values.NoValue()]
};
