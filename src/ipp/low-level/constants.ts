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
  operationAttributesTag = 0x01,
  jobAttributesTag = 0x02,
  endOfAttributesTag = 0x03,
  printerAttributesTag = 0x04,
  unsupportedAttributesTag = 0x05
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
 * | 0x4Bf     | Unassigned character-string data types (see IANA  |
 * |               | IPP registry)                                     |
 * +---------------+---------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
export enum ValueTag {
  // Out-of-Band Values
  unsupported = 0x10,
  unknown = 0x12,
  noValue = 0x13,
  // Integer Tags
  integer = 0x21,
  boolean = 0x22,
  enum = 0x23,
  // octetString Tags
  octetString = 0x30,
  dateTime = 0x31,
  resolution = 0x32,
  rangeOfInteger = 0x33,
  begCollection = 0x34,
  textWithLanguage = 0x35,
  nameWithLanguage = 0x36,
  endCollection = 0x37,
  // String Tags
  textWithoutLanguage = 0x41,
  nameWithoutLanguage = 0x42,
  keyword = 0x44,
  uri = 0x45,
  uriScheme = 0x46,
  charset = 0x47,
  naturalLanguage = 0x48,
  mimeMediaType = 0x49,
  memberAttrName = 0x4a
}

/**
 * +---------------+---------------------------------------------------+
 * | Value         | Operation Name                                    |
 * +---------------+---------------------------------------------------+
 * | 0x0000        | reserved, not used                                |
 * +---------------+---------------------------------------------------+
 * | 0x0001        | reserved, not used                                |
 * +---------------+---------------------------------------------------+
 * | 0x0002        | Print-Job                                         |
 * +---------------+---------------------------------------------------+
 * | 0x0003        | Print-URI                                         |
 * +---------------+---------------------------------------------------+
 * | 0x0004        | Validate-Job                                      |
 * +---------------+---------------------------------------------------+
 * | 0x0005        | Create-Job                                        |
 * +---------------+---------------------------------------------------+
 * | 0x0006        | Send-Document                                     |
 * +---------------+---------------------------------------------------+
 * | 0x0007        | Send-URI                                          |
 * +---------------+---------------------------------------------------+
 * | 0x0008        | Cancel-Job                                        |
 * +---------------+---------------------------------------------------+
 * | 0x0009        | Get-Job-Attributes                                |
 * +---------------+---------------------------------------------------+
 * | 0x000a        | Get-Jobs                                          |
 * +---------------+---------------------------------------------------+
 * | 0x000b        | Get-Printer-Attributes                            |
 * +---------------+---------------------------------------------------+
 * | 0x000c        | Hold-Job                                          |
 * +---------------+---------------------------------------------------+
 * | 0x000d        | Release-Job                                       |
 * +---------------+---------------------------------------------------+
 * | 0x000e        | Restart-Job                                       |
 * +---------------+---------------------------------------------------+
 * | 0x000f        | reserved for a future operation                   |
 * +---------------+---------------------------------------------------+
 * | 0x0010        | Pause-Printer                                     |
 * +---------------+---------------------------------------------------+
 * | 0x0011        | Resume-Printer                                    |
 * +---------------+---------------------------------------------------+
 * | 0x0012        | Purge-Jobs                                        |
 * +---------------+---------------------------------------------------+
 * | 0x0013-0x3fff | additional registered operations (see the IANA    |
 * |               | IPP registry and Section 7.8)                     |
 * +---------------+---------------------------------------------------+
 * | 0x4000-0x7fff | reserved for vendor extensions (see Section 7.8)  |
 * +---------------+---------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.15
 */
export enum OperationId {
  PrintJob = 0x0002,
  PrintURI = 0x0003,
  ValidateJob = 0x0004,
  CreateJob = 0x0005,
  SendDocument = 0x0006,
  SendURI = 0x0007,
  CancelJob = 0x0008,
  GetJobAttributes = 0x0009,
  GetJobs = 0x000a,
  GetPrinterAttributes = 0x000b,
  HoldJob = 0x000c,
  ReleaseJob = 0x000d,
  RestartJob = 0x000e,
  PausePrinter = 0x0010,
  ResumePrinter = 0x0011,
  PurgeJobs = 0x0012
}

/**
 * https://tools.ietf.org/html/rfc8011#appendix-B.1
 */
export enum StatusCode {
  // "successful" - 0x0000 to 0x00ff
  successfulOk = 0x0000,
  successfulOkIgnoredOrSubstitutedAttributes = 0x0001,
  successfulOkConflictingAttributes = 0x0002,

  // "informational" - 0x0100 to 0x01ff
  // "redirection" - 0x0300 to 0x03ff

  // "client-error" - 0x0400 to 0x04ff
  clientErrorBadRequest = 0x0400,
  clientErrorForbidden = 0x0401,
  clientErrorNotAuthenticated = 0x0402,
  clientErrorNotAuthorized = 0x0403,
  clientErrorNotPossible = 0x0404,
  clientErrorTimeout = 0x0405,
  clientErrorNotFound = 0x0406,
  clientErrorGone = 0x0407,
  clientErrorRequestEntityTooLarge = 0x0408,
  clientErrorRequestValueTooLong = 0x0409,
  clientErrorDocumentFormatNotSupported = 0x040a,
  clientErrorAttributesOrValuesNotSupported = 0x040b,
  clientErrorUriSchemeNotSupported = 0x040c,
  clientErrorCharsetNotSupported = 0x040d,
  clientErrorConflictingAttributes = 0x040e,
  clientErrorCompressionNotSupported = 0x040f,
  clientErrorCompressionError = 0x0410,
  clientErrorDocumentFormatError = 0x0411,
  clientErrorDocumentAccessError = 0x0412,

  // "server-error" - 0x0500 to 0x05ff
  serverErrorInternalError = 0x0500,
  serverErrorOperationNotSupported = 0x0501,
  serverErrorServiceUnavailable = 0x0502,
  serverErrorVersionNotSupported = 0x0503,
  serverErrorDeviceError = 0x0504,
  serverErrorTemporaryError = 0x0505,
  serverErrorNotAcceptingJobs = 0x0506,
  serverErrorBusy = 0x0507,
  serverErrorJobCanceled = 0x0508,
  serverErrorMultipleDocumentJobsNotSupported = 0x0509
}
