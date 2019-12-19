import { Message } from "../simple";

/**
 * +----------------------------------------+-------------+
 * | Operation                              | Conformance |
 * +----------------------------------------+-------------+
 * | Print-Job (Section 4.2.1)              | REQUIRED    |
 * +----------------------------------------+-------------+
 * | Print-URI (Section 4.2.2)              | OPTIONAL    |
 * +----------------------------------------+-------------+
 * | Validate-Job (Section 4.2.3)           | REQUIRED    |
 * +----------------------------------------+-------------+
 * | Create-Job (Section 4.2.4)             | RECOMMENDED |
 * +----------------------------------------+-------------+
 * | Get-Printer-Attributes (Section 4.2.5) | REQUIRED    |
 * +----------------------------------------+-------------+
 * | Get-Jobs (Section 4.2.6)               | REQUIRED    |
 * +----------------------------------------+-------------+
 * | Pause-Printer (Section 4.2.7)          | OPTIONAL    |
 * +----------------------------------------+-------------+
 * | Resume-Printer (Section 4.2.8)         | OPTIONAL    |
 * +----------------------------------------+-------------+
 * | Purge-Jobs (Section 4.2.9)             | SHOULD NOT  |
 * +----------------------------------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8011#section-6.2.2
 */
export namespace operations {
  /**
   * This REQUIRED operation allows a Client to submit a Print Job with
   * only one Document and supply the Document data (rather than just a
   * reference to the data).  See Appendix C for the suggested steps for
   * processing Job Creation requests and their operation and Job Template
   * attributes.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.2.1
   */
  export function printJob(request: Message): Message {
    return request;
  }

  /**
   * This REQUIRED operation is similar to the Print-Job operation
   * (Section 4.2.1), except that a Client supplies no Document data and
   * the Printer allocates no resources, i.e., it does not create a new
   * Job.  This operation is used only to verify the capabilities of a
   * Printer against whatever attributes are supplied by the Client in the
   * Validate-Job request.  By using the Validate-Job operation, a Client
   * can validate that an identical Job Creation request (with the
   * Document data) would be accepted.  The Validate-Job operation also
   * performs the same security negotiation as the Print-Job, Print-URI,
   * and Create-Job operations (see Section 9) so that a Client can check
   * that the Client and Printer security requirements can be met before
   * performing a Job Creation request.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.2.3
   */
  export function validateJob(request: Message): Message {
    return request;
  }

  /**
   * This REQUIRED operation allows a Client to request the values of the
   * attributes of a Printer.  In the request, the Client supplies the set
   * of Printer attribute names and/or attribute group names in which the
   * requester is interested.  In the response, the Printer returns a
   * corresponding attribute set with the appropriate attribute values
   * filled in.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.2.5
   */
  export function getPrinterAttributes(request: Message): Message {
    return request;
  }

  /**
   * This REQUIRED operation allows a Client to retrieve the list of Jobs
   * belonging to the target Printer.  The Client can also supply a list
   * of Job attribute names and/or attribute group names.  A group of Job
   * attributes will be returned for each Job that is returned.
   *
   * https://tools.ietf.org/html/rfc8011#section-4.2.6
   */
  export function getJobs(request: Message): Message {
    return request;
  }
}
