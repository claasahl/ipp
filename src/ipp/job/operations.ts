import assert from "assert";
import debug from "debug";

import { Message } from "../simple/types";
import { OperationId, StatusCode } from "../low-level/constants";

/**
 * +------------------------------------+-------------+
 * | Operation                          | Conformance |
 * +------------------------------------+-------------+
 * | Send-Document (Section 4.3.1)      | RECOMMENDED |
 * +------------------------------------+-------------+
 * | Send-URI (Section 4.3.2)           | RECOMMENDED |
 * +------------------------------------+-------------+
 * | Cancel-Job (Section 4.3.3)         | REQUIRED    |
 * +------------------------------------+-------------+
 * | Get-Job-Attributes (Section 4.3.4) | REQUIRED    |
 * +------------------------------------+-------------+
 * | Hold-Job (Section 4.3.5)           | OPTIONAL    |
 * +------------------------------------+-------------+
 * | Release-Job (Section 4.3.6)        | OPTIONAL    |
 * +------------------------------------+-------------+
 * | Restart-Job (Section 4.3.7)        | SHOULD NOT  |
 * +------------------------------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-6.2.2
 */
export namespace operations {
  /**
   * This REQUIRED operation allows a Client to cancel a Print Job from
   * the time the Job is created up to the time it is completed, canceled,
   * or aborted.  Since a Job might already be printing by the time a
   * Cancel-Job is received, some Media Sheet pages might be printed
   * before the Job is actually terminated.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.3.3
   */
  export function cancelJob(request: Message): Message {
    return request;
  }

  /**
   * This REQUIRED operation allows a Client to request the values of
   * attributes of a Job, and it is almost identical to the
   * Get-Printer-Attributes operation (see Section 4.2.5).  The only
   * differences are that the operation is directed at a Job rather than a
   * Printer, there is no "document-format" operation attribute used when
   * querying a Job, and the returned attribute group is a set of Job
   * attributes rather than a set of Printer attributes.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.3.4
   */
  export function getJobAttributes(request: Message): Message {
    return request;
  }
}
