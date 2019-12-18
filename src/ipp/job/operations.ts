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
export const operations = {
  cancelJob: undefined,
  getJobAttributes: undefined
};
