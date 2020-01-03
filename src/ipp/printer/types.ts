import { OperationId } from "../simple";

/**
 * o  'none': no compression is used.
 *
 * o  'deflate': ZIP inflate/deflate compression technology described in
 *    RFC 1951 [RFC1951].
 *
 * o  'gzip': GNU zip compression technology described in RFC 1952
 *    [RFC1952].
 *
 * o  'compress': UNIX compression technology described in RFC 1977
 *    [RFC1977].
 * https://tools.ietf.org/html/rfc8011#section-5.4.32
 */
export enum Compression {
  none,
  deflate,
  gzip,
  compress
}

/**
 *  o  'attempted': This value indicates that the Printer attempts to
 *     make the IPP attribute values take precedence over embedded
 *     instructions in the Document data; however, there is no guarantee.
 *
 *  o  'not-attempted': This value indicates that the Printer makes no
 *     attempt to make the IPP attribute values take precedence over
 *     embedded instructions in the Document data.
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.28
 */
export enum PdlOverride {
  attempted,
  notAttempted
}

/**
 * +-------+-----------------------------------------------------------+
 * | Value | Symbolic Name and Description                             |
 * +-------+-----------------------------------------------------------+
 * | '3'   | 'idle': Indicates that new Jobs can start processing      |
 * |       | without waiting.                                          |
 * +-------+-----------------------------------------------------------+
 * | '4'   | 'processing': Indicates that Jobs are processing; new     |
 * |       | Jobs will wait before processing.                         |
 * +-------+-----------------------------------------------------------+
 * | '5'   | 'stopped': Indicates that no Jobs can be processed and    |
 * |       | intervention is required.                                 |
 * +-------+-----------------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.11
 */
export enum PrinterState {
  idle = 3,
  processing = 4,
  stopped = 5
}

/**
 * o  '-report': This suffix indicates that the reason is a "report".
 *     An implementation can choose to omit some or all reports.  Some
 *     reports specify finer granularity about the Printer state; others
 *     serve as a precursor to a warning.  A report MUST contain nothing
 *     that could affect the printed output.  Reports correspond to the
 *     'other' value for the prtAlertSeverityLevel property in the
 *     Printer MIB [RFC3805].
 *
 * o  '-warning': This suffix indicates that the reason is a "warning".
 *     An implementation can choose to omit some or all warnings.
 *     Warnings serve as a precursor to an error.  A warning MUST contain
 *     nothing that prevents a Job from completing, though in some cases
 *     the output can be of lower quality.  Warnings correspond to the
 *     'warning' value for the prtAlertSeverityLevel property in the
 *     Printer MIB [RFC3805].
 *
 * o  '-error': This suffix indicates that the reason is an "error".  An
 *     implementation MUST include all errors.  If this attribute
 *     contains one or more errors, the Printer MUST be in the 'stopped'
 *     state.  Errors correspond to the 'critical' value for the
 *     prtAlertSeverityLevel property in the Printer MIB [RFC3805].
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.12
 */
export enum PrinterStateReasonSeverity {
  report,
  warning,
  error
}

/**
 * o  'none': There are no reasons.  This state reason is semantically
 *    equivalent to "printer-state-reasons" without any value and MUST
 *    be used, since the '1setOf' attribute syntax requires at least one
 *    value.
 *
 * o  'other': The device has detected a condition other than one listed
 *    in this document.
 *
 * o  'connecting-to-device': The Printer has scheduled a Job on the
 *    Output Device and is in the process of connecting to a shared
 *    network Output Device (and might not be able to actually start
 *    printing the Job for an arbitrarily long time, depending on the
 *    usage of the Output Device by other servers on the network).
 *
 * o  'cover-open': One or more covers on the device are open,
 *    equivalent to a prtCoverStatus [RFC3805] of 3 (coverOpen).
 *
 * o  'developer-empty: The device is out of developer.
 *
 * o  'developer-low': The device is low on developer.
 *
 * o  'door-open': One or more doors on the device are open, equivalent
 *    to a prtCoverStatus [RFC3805] of 3 (coverOpen).
 *
 * o  'fuser-over-temp': The fuser temperature is above normal,
 *    equivalent to a prtMarkerStatus [RFC3805] of 19 (the sum of
 *    "Unavailable because Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'fuser-under-temp': The fuser temperature is below normal,
 *    equivalent to a prtMarkerStatus [RFC3805] of 19 (the sum of
 *    "Unavailable because Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'input-tray-missing': One or more input trays are not in the
 *    device, equivalent to a prtInputStatus [RFC3805] of 19 (the sum of
 *    "Unavailable because Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'interlock-open': One or more interlock devices on the Printer are
 *    unlocked, equivalent to a prtCoverStatus [RFC3805] of 5
 *    (interlockOpen).
 *
 * o  'interpreter-resource-unavailable': An interpreter resource is
 *    unavailable (i.e., font, form).
 *
 * o  'marker-supply-empty: The device is out of at least one marker
 *    supply, e.g., toner, ink, ribbon.
 *
 * o  'marker-supply-low': The device is low on at least one marker
 *    supply, e.g., toner, ink, ribbon.
 *
 * o  'marker-waste-almost-full': The device marker supply waste
 *    receptacle is almost full.
 *
 * o  'marker-waste-full': The device marker supply waste receptacle is
 *    full.
 *
 * o  'media-empty': At least one input tray is empty, equivalent to a
 *    prtInputStatus [RFC3805] of 19 (the sum of "Unavailable because
 *    Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'media-jam': The device has a media jam, equivalent to a
 *    prtInputStatus [RFC3805] of 19 (the sum of "Unavailable because
 *    Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'media-low': At least one input tray is low on media, equivalent
 *    to a prtInputStatus [RFC3805] of 8 (Non-Critical Alerts).
 *
 * o  'media-needed': A tray has run out of media, equivalent to a
 *    prtInputStatus [RFC3805] value of 17 (the sum of "Unavailable and
 *    OnRequest" (1) and "Critical Alerts" (16)).
 *
 * o  'moving-to-paused': Someone has paused the Printer using the
 *    Pause-Printer operation (see Section 4.2.7) or other means, but
 *    the device(s) is taking an appreciable time to stop.  Later, when
 *    all output has stopped, "printer-state" becomes 'stopped', and the
 *    'paused' value replaces the 'moving-to-paused' value in the
 *    "printer-state-reasons" attribute.  This value MUST be supported
 *    if the Pause-Printer operation is supported and the implementation
 *    takes significant time to pause a device in certain circumstances.
 *
 * o  'opc-life-over': The optical photo conductor is no longer
 *    functioning, equivalent to a prtMarkerStatus [RFC3805] of 19
 *    (the sum of "Unavailable because Broken" (3) and
 *    "Critical Alerts" (16)).
 *
 * o  'opc-near-eol': The optical photo conductor is near its end of
 *    life, equivalent to a prtMarkerStatus [RFC3805] of 8 (Non-Critical
 *    Alerts).
 *
 * o  'output-area-almost-full': One or more output areas are almost
 *    full, e.g., tray, stacker, collator, equivalent to a
 *    prtOutputStatus [RFC3805] of 8 (Non-Critical Alerts).
 *
 * o  'output-area-full': One or more output areas are full, e.g., tray,
 *    stacker, collator, equivalent to a prtInputStatus [RFC3805] of 19
 *    (the sum of "Unavailable because Broken" (3) and
 *    "Critical Alerts" (16)).
 *
 * o  'output-tray-missing': One or more output trays are not in the
 *    device, equivalent to a prtOutputStatus [RFC3805] of 19 (the sum
 *    of "Unavailable because Broken" (3) and "Critical Alerts" (16)).
 *
 * o  'paused': Someone has paused the Printer using the Pause-Printer
 *    operation (see Section 4.2.7) or other means, and the Printer's
 *    "printer-state" is 'stopped'.  In this state, a Printer MUST NOT
 *    produce printed output, but it MUST perform other operations
 *    requested by a Client.  If a Printer had been printing a Job when
 *    the Printer was paused, the Printer MUST resume printing that Job
 *    when the Printer is no longer paused and leave no evidence in the
 *    printed output of such a pause.  This value MUST be supported if
 *    the Pause-Printer operation is supported.
 *
 * o  'shutdown': Someone has removed a Printer from service, and the
 *    device can be powered down or physically removed.  In this state,
 *    a Printer MUST NOT produce printed output, and unless the Printer
 *    is realized by a print server that is still active, the Printer
 *    MUST perform no other operations requested by a Client, including
 *    returning this value.  If a Printer had been printing a Job when
 *    it was shut down, the Printer MAY resume printing that Job when
 *    the Printer is restarted.  If the Printer resumes printing such a
 *    Job, it can leave evidence in the printed output of such a
 *    shutdown, e.g., the part printed before the shutdown can be
 *    printed a second time after the shutdown.
 *
 * o  'spool-area-full': The limit of persistent storage allocated for
 *    spooling has been reached.  The Printer is temporarily unable to
 *    accept more Jobs.  The Printer will remove this value when it is
 *    able to accept more Jobs.  This value SHOULD be used by a
 *    non-spooling Printer that only accepts one or a small number of
 *    Jobs at a time or by a spooling Printer that has filled the spool
 *    space.
 *
 * o  'stopped-partly': When a Printer controls more than one Output
 *    Device, this reason indicates that one or more Output Devices are
 *    stopped.  If the reason is a report, fewer than half of the Output
 *    Devices are stopped.  If the reason is a warning, fewer than all
 *    of the Output Devices are stopped.
 *
 * o  'stopping': The Printer is in the process of stopping the device
 *    and will be stopped in a while.  When the device is stopped, the
 *    Printer will change the Printer's state to 'stopped'.  The
 *    'stopping-warning' reason is never an error, even for a Printer
 *    with a single Output Device.  When an Output Device ceases
 *    accepting Jobs, the Printer will have this reason while the Output
 *    Device completes printing.
 *
 * o  'timed-out': The server was able to connect to the Output Device
 *    (or is always connected) but was unable to get a response from the
 *    Output Device.
 *
 * o  'toner-empty': The device is out of toner.
 *
 * o  'toner-low': The device is low on toner.
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.12
 */
export enum PrinterStateReason {
  none,
  other,
  connectingToDevice,
  coverOpen,
  developerEmpty,
  developerLow,
  doorOpen,
  fuserOverTemp,
  fuserUnderTemp,
  inputTrayMissing,
  interlockOpen,
  interpreterResourceUnavailable,
  markerSupplyEmpty,
  markerSupplyLow,
  markerWasteAlmostFull,
  markerWasteFull,
  mediaEmpty,
  mediaJam,
  mediaLow,
  mediaNeeded,
  movingToPaused,
  opcLifeOver,
  opcNearEol,
  outputAreaAlmostFull,
  outputAreaFull,
  outputTrayMissing,
  paused,
  shutdown,
  spoolAreaFull,
  stoppedPartly,
  stopping,
  timedOut,
  tonerEmpty,
  tonerLow
}

/**
 * o  'none': There is no authentication mechanism associated with the
 *    URI.  The Printer assumes that the authenticated user is
 *    'anonymous'.
 *
 * o  'requesting-user-name': When a Client performs an operation whose
 *    target is the associated URI, the Printer assumes that the
 *    authenticated user is specified by the "requesting-user-name"
 *    operation attribute (see Section 9.3).  If the
 *    "requesting-user-name" attribute is absent in a request, the
 *    Printer assumes that the authenticated user is 'anonymous'.
 *
 * o  'basic': When a Client performs an operation whose target is the
 *    associated URI, the Printer challenges the Client with HTTP Basic
 *    authentication [RFC7617].  The Printer assumes that the
 *    authenticated user is the name received via the Basic
 *    authentication mechanism.
 *
 * o  'digest': When a Client performs an operation whose target is the
 *    associated URI, the Printer challenges the Client with HTTP Digest
 *    authentication [RFC7616].  The Printer assumes that the
 *    authenticated user is the name received via the Digest
 *    authentication mechanism.
 *
 * o  'certificate': When a Client performs an operation whose target is
 *    the associated URI, the Printer expects the Client to provide an
 *    X.509 certificate.  The Printer assumes that the authenticated
 *    user is one of the textual names (Common Name or Subject Alternate
 *    Names) contained within the certificate.
 * https://tools.ietf.org/html/rfc8011#section-5.4.2
 */
export enum Authentication {
  none,
  requestingUserName,
  basic,
  digest,
  certificate
}

/**
 * o  'none': There are no secure communication channel protocols in use
 *     for the given URI.
 *
 * o  'tls': TLS [RFC5246] [RFC7525] is the secure communications
 *    channel protocol in use for the given URI.
 *
 * https://tools.ietf.org/html/rfc8011#section-5.4.3
 */
export enum PrinterSecurity {
  none,
  tls
}

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
export interface Printer {
  charsetConfigured: "utf-8";
  charsetSupported: "utf-8";
  compressionSupported: Compression;
  documentFormatDefault: "application/postscript";
  documentFormatSupported: "application/postscript";
  generatedNaturalLanguageSupported: "en-us";
  ippVersionsSupported: "1.1";
  naturalLanguageConfigured: "en-us";
  operationsSupported: OperationId[];
  pdlOverrideSupported: PdlOverride;
  printerName: string;
  readonly printerIsAcceptingJobs: boolean;
  readonly printerState: PrinterState;
  readonly printerStateReasons:
    | PrinterStateReason
    | { reason: PrinterStateReason; severity: PrinterStateReasonSeverity };
  readonly printerUpTime: number;
  readonly printerUriSupported: string;
  readonly queuedJobCount: number;
  readonly uriAuthenticationSupported: Authentication;
  readonly uriSecuritySupported: PrinterSecurity;
}

/**
 * +--------+----------------------------------------------------------+
 * | Values | Symbolic Name and Description                            |
 * +--------+----------------------------------------------------------+
 * | '3'    | 'pending': The Job is a candidate to start processing    |
 * |        | but is not yet processing.                               |
 * +--------+----------------------------------------------------------+
 * | '4'    | 'pending-held': The Job is not a candidate for           |
 * |        | processing for any number of reasons but will return to  |
 * |        | the 'pending' state as soon as the reasons are no longer |
 * |        | present.  The Job's "job-state-reasons" attribute MUST   |
 * |        | indicate why the Job is no longer a candidate for        |
 * |        | processing.                                              |
 * +--------+----------------------------------------------------------+
 * | '5'    | 'processing': One or more of the following: (1) the Job  |
 * |        | is using, or is attempting to use, one or more purely    |
 * |        | software processes that are analyzing, creating, or      |
 * |        | interpreting a PDL, etc.; (2) the Job is using, or is    |
 * |        | attempting to use, one or more hardware devices that are |
 * |        | interpreting a PDL; making marks on a medium; and/or     |
 * |        | performing finishing, such as stapling, etc.; (3) the    |
 * |        | Printer has made the Job ready for printing, but the     |
 * |        | Output Device is not yet printing it, either because the |
 * |        | Job hasn't reached the Output Device or because the Job  |
 * |        | is queued in the Output Device or some other spooler,    |
 * |        | waiting for the Output Device to print it.  When the Job |
 * |        | is in the 'processing' state, the entire Job state       |
 * |        | includes the detailed status represented in the          |
 * |        | Printer's "printer-state", "printer-state-reasons", and  |
 * |        | "printer-state-message" attributes.  Implementations MAY |
 * |        | include additional values in the Job's "job-state-       |
 * |        | reasons" attribute to indicate the progress of the Job,  |
 * |        | such as adding the 'job-printing' value to indicate when |
 * |        | the Output Device is actually making marks on paper      |
 * |        | and/or the 'processing-to-stop-point' value to indicate  |
 * |        | that the Printer is in the process of canceling or       |
 * |        | aborting the Job.                                        |
 * +--------+----------------------------------------------------------+
 * | '6'    | 'processing-stopped': The Job has stopped while          |
 * |        | processing for any number of reasons and will return to  |
 * |        | the 'processing' state as soon as the reasons are no     |
 * |        | longer present.  The Job's "job-state-reasons" attribute |
 * |        | MAY indicate why the Job has stopped processing.  For    |
 * |        | example, if the Output Device is stopped, the 'printer-  |
 * |        | stopped' value MAY be included in the Job's "job-state-  |
 * |        | reasons" attribute.  Note: When an Output Device is      |
 * |        | stopped, the device usually indicates its condition in   |
 * |        | human-readable form locally at the device.  A Client can |
 * |        | obtain more complete device status remotely by querying  |
 * |        | the Printer's "printer-state", "printer-state-reasons",  |
 * |        | and "printer-state-message" attributes.                  |
 * +--------+----------------------------------------------------------+
 * | '7'    | 'canceled':  The Job has been canceled by a Cancel-Job   |
 * |        | operation, and the Printer has completed canceling the   |
 * |        | Job.  All Job Status attributes have reached their final |
 * |        | values for the Job.  While the Printer is canceling the  |
 * |        | Job, the Job remains in its current state, but the Job's |
 * |        | "job-state-reasons" attribute SHOULD contain the         |
 * |        | 'processing-to-stop-point' value and one of the          |
 * |        | 'canceled-by-user', 'canceled-by-operator', or           |
 * |        | 'canceled-at-device' values.  When the Job moves to the  |
 * |        | 'canceled' state, the 'processing-to-stop-point' value,  |
 * |        | if present, MUST be removed, but 'canceled-by-xxx', if   |
 * |        | present, MUST remain.                                    |
 * +--------+----------------------------------------------------------+
 * | '8'    | 'aborted': The Job has been aborted by the system,       |
 * |        | usually while the Job was in the 'processing' or         |
 * |        | 'processing-stopped' state, and the Printer has          |
 * |        | completed aborting the Job; all Job Status attributes    |
 * |        | have reached their final values for the Job.  While the  |
 * |        | Printer is aborting the Job, the Job remains in its      |
 * |        | current state, but the Job's "job-state-reasons"         |
 * |        | attribute SHOULD contain the 'processing-to-stop-point'  |
 * |        | and 'aborted-by-system' values.  When the Job moves to   |
 * |        | the 'aborted' state, the 'processing-to-stop-point'      |
 * |        | value, if present, MUST be removed, but the 'aborted-by- |
 * |        | system' value, if present, MUST remain.                  |
 * +--------+----------------------------------------------------------+
 * | '9'    | 'completed': The Job has completed successfully or with  |
 * |        | warnings or errors after processing, all of the Job      |
 * |        | Media Sheets have been successfully stacked in the       |
 * |        | appropriate output bin(s), and all Job Status attributes |
 * |        | have reached their final values for the Job.  The Job's  |
 * |        | "job-state-reasons" attribute SHOULD contain one of the  |
 * |        | 'completed-successfully', 'completed-with-warnings', or  |
 * |        | 'completed-with-errors' values.                          |
 * +--------+----------------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-5.3.7
 */
export enum JobState {
  pending = 3,
  pendingHeld = 4,
  processing = 5,
  processingStopped = 6,
  canceled = 7,
  aborted = 8,
  completed = 9
}

/**
 *  o  'none': There are no reasons for the Job's current state.  This
 *     state reason is semantically equivalent to "job-state-reasons"
 *     without any value and MUST be used when there is no other value,
 *     since the '1setOf' attribute syntax requires at least one value.
 *
 *  o  'job-incoming': Either (1) the Printer has accepted the Create-Job
 *     operation and is expecting additional Send-Document and/or
 *     Send-URI operations or (2) the Printer is retrieving/accepting
 *     Document data as a result of a Print-Job, Print-URI,
 *     Send-Document, or Send-URI operation.
 *
 *  o  'job-data-insufficient': The Create-Job operation has been
 *     accepted by the Printer, but the Printer is expecting additional
 *     Document data before it can move the Job into the 'processing'
 *     state.  If a Printer starts processing before it has received all
 *     data, the Printer removes the 'job-data-insufficient' reason, but
 *     the 'job-incoming' reason remains.  If a Printer starts processing
 *     after it has received all data, the Printer removes the
 *     'job-data-insufficient' reason and the 'job-incoming' reason at
 *     the same time.
 *
 *  o  'document-access-error': After accepting a Print-URI or Send-URI
 *     request, the Printer could not access one or more Documents passed
 *     by reference.  This reason is intended to cover any file access
 *     problem, including 'file does not exist' and 'access denied'
 *     because of an access control problem.  The Printer MAY also
 *     indicate the Document access error using the
 *     "job-document-access-errors" Job Status attribute (see
 *     Section 5.3.11).  The Printer can (1) abort the Job and move the
 *     Job to the 'aborted' Job state or (2) print all Documents that are
 *     accessible and move the Job to the 'completed' Job state with the
 *     'completed-with-errors' value in the Job's "job-state-reasons"
 *     attribute.  This value SHOULD be supported if the Print-URI or
 *     Send-URI operations are supported.
 *
 *  o  'submission-interrupted': The Job was not completely submitted for
 *     some unforeseen reason, such as (1) the Printer has crashed before
 *     the Job was closed by the Client, (2) the Printer or the Document
 *     transfer method has crashed in some non-recoverable way before the
 *     Document data was entirely transferred to the Printer, or (3) the
 *     Client crashed or failed to close the Job before the time-out
 *     period.  See Section 5.4.31.
 *
 *  o  'job-outgoing': The Printer is transmitting the Job to the Output
 *     Device.
 *
 *  o  'job-hold-until-specified': The value of the Job's
 *     "job-hold-until" attribute was specified with a time period that
 *     is still in the future.  The Job MUST NOT be a candidate for
 *     processing until this reason is removed and there are no other
 *     reasons to hold the Job.  This value SHOULD be supported if the
 *     "job-hold-until" Job Template attribute is supported.
 *
 *  o  'resources-are-not-ready': At least one of the resources needed by
 *     the Job, such as media, fonts, resource objects, etc., is not
 *     ready on any of the physical Output Devices for which the Job is a
 *     candidate.  This condition MAY be detected when the Job is
 *     accepted, or subsequently while the Job is pending or processing,
 *     depending on implementation.  The Job can remain in its current
 *     state or be moved to the 'pending-held' state, depending on
 *     implementation and/or Job scheduling policy.
 *
 *  o  'printer-stopped-partly': The value of the Printer's
 *     "printer-state-reasons" attribute contains the value
 *     'stopped-partly'.
 *
 *  o  'printer-stopped': The value of the Printer's "printer-state"
 *     attribute is 'stopped'.
 *
 *  o  'job-interpreting': The Job is in the 'processing' state, but,
 *     more specifically, the Printer is interpreting the Document data.
 *
 *  o  'job-queued': The Job is in the 'processing' state, but, more
 *     specifically, the Printer has queued the Document data.
 *
 *  o  'job-transforming': The Job is in the 'processing' state, but,
 *     more specifically, the Printer is interpreting Document data and
 *     producing another electronic representation.
 *
 *  o  'job-queued-for-marker': The Job is in any of the 'pending-held',
 *     'pending', or 'processing' states, but, more specifically, the
 *     Printer has completed enough processing of the Document to be able
 *     to start marking, and the Job is waiting for the marker.  Systems
 *     that require human intervention to release Jobs using the
 *     Release-Job operation put the Job into the 'pending-held' Job
 *     state.  Systems that automatically select a Job to use the marker
 *     put the Job into the 'pending' Job state or keep the Job in the
 *     'processing' Job state while waiting for the marker, depending on
 *     implementation.  All implementations put the Job into the
 *     'processing' state when marking does begin.
 *
 *  o  'job-printing': The Output Device is marking media.  This value is
 *     useful for Printers that spend a great deal of time processing
 *     (1) when no marking is happening and they want to show that
 *     marking is now happening or (2) when the Job is in the process of
 *     being canceled or aborted while the Job remains in the
 *     'processing' state, but the marking has not yet stopped so that
 *     Impression or sheet counts are still increasing for the Job.
 *
 *  o  'job-canceled-by-user': The Job was canceled by the owner of the
 *     Job using the Cancel-Job request, i.e., by a user whose
 *     authenticated identity is the same as the value of the originating
 *     user that created the Job, or by some other authorized End User,
 *     such as a member of the Job owner's security group.  This value
 *     SHOULD be supported.
 *
 *  o  'job-canceled-by-operator': The Job was canceled by the Operator
 *     using the Cancel-Job request, i.e., by a user who has been
 *     authenticated as having Operator privileges (whether local or
 *     remote).  If the security policy is to allow anyone to cancel
 *     anyone's Job, then this value can be used when the Job is canceled
 *     by other than the owner of the Job.  For such a security policy,
 *     in effect, everyone is an Operator as far as canceling Jobs with
 *     IPP is concerned.  This value SHOULD be supported if the
 *     implementation permits canceling by other than the owner of
 *     the Job.
 *
 *  o  'job-canceled-at-device': The Job was canceled by an unidentified
 *     local user, i.e., a user at a console at the device.  This value
 *     SHOULD be supported if the implementation supports canceling Jobs
 *     at the console.
 *
 *  o  'aborted-by-system': The Job (1) is in the process of being
 *     aborted, (2) has been aborted by the system and placed in the
 *     'aborted' state, or (3) has been aborted by the system and placed
 *     in the 'pending-held' state, so that a user or Operator can
 *     manually try the Job again.  This value SHOULD be supported.
 *
 *  o  'unsupported-compression': The Job was aborted by the system
 *     because the Printer determined, while attempting to decompress the
 *     Document data, that the compression algorithm is actually not
 *     among those supported by the Printer.  This value MUST be
 *     supported, since "compression" is a REQUIRED operation attribute.
 *
 *  o  'compression-error': The Job was aborted by the system because the
 *     Printer encountered an error in the Document data while
 *     decompressing it.  If the Printer posts this reason, the Document
 *     data has already passed any tests that would have led to the
 *     'unsupported-compression' "job-state-reasons" value.
 *
 *  o  'unsupported-document-format': The Job was aborted by the system
 *     because the Document data's "document-format" attribute is not
 *     among those supported by the Printer.  If the Client specifies
 *     "document-format" as 'application/octet-stream', the Printer MAY
 *     abort the Job and post this reason even though the
 *     "document-format" value is among the values of the Printer's
 *     "document-format-supported" Printer attribute but not among the
 *     auto-sensed Document formats.  This value MUST be supported, since
 *     "document-format" is a REQUIRED operation attribute.
 *
 *  o  'document-format-error': The Job was aborted by the system because
 *     the Printer encountered an error in the Document data while
 *     processing it.  If the Printer posts this reason, the Document
 *     data has already passed any tests that would have led to the
 *     'unsupported-document-format' "job-state-reasons" value.
 *
 *  o  'processing-to-stop-point': The requester has issued a Cancel-Job
 *     operation or the Printer has aborted the Job, but the Printer is
 *     still performing some actions on the Job until a specified stop
 *     point occurs or Job termination/cleanup is completed.
 *
 *     If the implementation requires some measurable time to cancel the
 *     Job in the 'processing' or 'processing-stopped' Job state, the
 *     Printer MUST use this value to indicate that the Printer is still
 *     performing some actions on the Job while the Job remains in the
 *     'processing' or 'processing-stopped' state.  Once at the stop
 *     point, the Printer moves the Job from the 'processing' state to
 *     the 'canceled' or 'aborted' Job state.
 *
 *  o  'service-off-line': The Printer is offline and accepting no Jobs.
 *     All 'pending' Jobs are put into the 'pending-held' state.  This
 *     situation could be true if the service's or Document transform's
 *     input is impaired or broken.
 *
 *  o  'job-completed-successfully': The Job completed successfully.
 *     This value SHOULD be supported.
 *
 *  o  'job-completed-with-warnings': The Job completed with warnings.
 *     This value SHOULD be supported if the implementation detects
 *     warnings.
 *
 *  o  'job-completed-with-errors': The Job completed with errors (and
 *     possibly warnings too).  This value SHOULD be supported if the
 *     implementation detects errors.
 *
 *  o  'job-restartable': This Job is retained (see Section 5.3.7.2) and
 *     is currently able to be restarted using the Restart-Job (see
 *     Section 4.3.7) or Resubmit-Job [PWG5100.11] operation.  If
 *     'job-restartable' is a value of the Job's "job-state-reasons"
 *     attribute, then the Printer MUST accept a Restart-Job operation
 *     for that Job.  This value SHOULD be supported if the Restart-Job
 *     operation is supported.
 *
 *  o  'queued-in-device': The Job has been forwarded to a device or
 *     print system that is unable to send back status.  The Printer sets
 *     the Job's "job-state" attribute to 'completed' and adds the
 *     'queued-in-device' value to the Job's "job-state-reasons"
 *     attribute to indicate that the Printer has no additional
 *     information about the Job and never will have any better
 *     information.  See Section 5.3.7.1.
 *
 * https://tools.ietf.org/html/rfc8011#section-5.3.8
 */
export enum JobStateReason {
  none,
  jobIncoming,
  jobDataInsufficient,
  documentAccessError,
  submissionInterrupted,
  jobOutgoing,
  jobHoldUntilSpecified,
  resourcesAreNotReady,
  printerStoppedPartly,
  printerStopped,
  jobInterpreting,
  jobQueued,
  jobTransforming,
  jobQueuedForMarker,
  jobPrinting,
  jobCanceledByUser,
  jobCanceledByOperator,
  jobCanceledAtDevice,
  abortedBySystem,
  unsupportedCompression,
  compressionError,
  unsupportedDocumentFormat,
  documentFormatError,
  processingToStopPoint,
  serviceOffLine,
  jobCompletedSuccessfully,
  jobCompletedWithWarnings,
  jobCompletedWithErrors,
  jobRestartable,
  queuedInDevice
}

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
export interface Job {
  jobName: string;
  readonly attributesCharset: "utf-8";
  readonly attributesNaturalLanguage: "en-us";
  readonly jobId: number;
  readonly jobOriginatingUserName?: string;
  readonly jobPrinterUpTime: number;
  readonly jobPrinterUri: string;
  readonly jobState: JobState;
  readonly jobStateReasons: JobStateReason;
  readonly jobUri: string;
  readonly timeAtCompleted?: number;
  readonly timeAtCreation: number;
  readonly timeAtProcessing?: number;
}
