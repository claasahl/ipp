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
export const operations = {
  printJob: undefined,
  validateJob: undefined,
  getPrinterAttributes: undefined,
  getJobs: undefined
};
