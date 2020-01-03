import assert from "assert";

import {
  Message,
  CharsetValue,
  NaturalLanguageValue,
  AttributeGroup,
  ValueTag,
  NameWithoutLanguageValue,
  NameWithLanguageValue,
  TextWithoutLanguageValue,
  TextWithLanguageValue,
  IntegerValue,
  EnumValue,
  MimeMediaTypeValue,
  KeywordValue,
  UriValue
} from "../simple";
import { OperationId, StatusCode, BeginAttributeGroupTag } from "../low-level";
import {
  getPrinterAttributes as getPrinterAttributez,
  getJobs as getJobz,
  getJobAttributes as getJobAttributez,
  printJob as printJobb,
  validateJob as validateJobb,
  getJobAttributes as cancelJobb
} from "./data";

const {
  GetPrinterAttributes,
  GetJobs,
  PrintJob,
  ValidateJob,
  CancelJob,
  GetJobAttributes
} = OperationId;
const { successfulOk } = StatusCode;
const {
  operationAttributesTag,
  printerAttributesTag,
  jobAttributesTag
} = BeginAttributeGroupTag;

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
export namespace PrinterOperations {
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, PrintJob);
    assert.ok(request.data);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri =
      getString(request.attributeGroups[0], "printer-uri") || "";
    const attributes = printJobb(printerUri, request.data as Buffer);
    if (!attributes) {
      throw new Error("implement me");
    }
    const whiteList = ["job-id", "job-uri", "job-state", "job-state-reasons"];
    const jobAttributes = attributes.filter(attr =>
      whiteList.includes(attr.name)
    );
    assert.strictEqual(jobAttributes.length, whiteList.length);

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        },
        {
          groupTag: jobAttributesTag,
          attributes: jobAttributes
        }
      ]
    };
    return response;
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, ValidateJob);
    assert.ok(!request.data);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri =
      getString(request.attributeGroups[0], "printer-uri") || "";
    const valid = validateJobb(printerUri);
    if (!valid) {
      throw new Error("implement me");
    }

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        }
      ]
    };
    return response;
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, GetPrinterAttributes);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri =
      getString(request.attributeGroups[0], "printer-uri") || "";
    const attributes = getPrinterAttributez(printerUri);
    if (!attributes) {
      throw new Error("implement me");
    }

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        },
        {
          groupTag: printerAttributesTag,
          attributes
        }
      ]
    };
    return response;
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, GetJobs);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri =
      getString(request.attributeGroups[0], "printer-uri") || "";
    const jobs = getJobz(printerUri);
    if (!jobs) {
      throw new Error("implement me");
    }

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        },
        ...jobs
      ]
    };
    return response;
  }
}

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
export namespace JobOperations {
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, CancelJob);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri = getString(request.attributeGroups[0], "printer-uri");
    const jobId = getNumber(request.attributeGroups[0], "job-id");
    const jobUri = getString(request.attributeGroups[0], "job-uri");
    const attributes = (() => {
      if (printerUri && jobId) {
        return cancelJobb(printerUri, jobId);
      } else if (jobUri) {
        return cancelJobb(jobUri);
      }
      return undefined;
    })();
    if (!attributes) {
      throw new Error("implement me");
    }

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        },
        {
          groupTag: jobAttributesTag,
          attributes
        }
      ]
    };
    return response;
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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, GetJobAttributes);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

    const printerUri = getString(request.attributeGroups[0], "printer-uri");
    const jobId = getNumber(request.attributeGroups[0], "job-id");
    const jobUri = getString(request.attributeGroups[0], "job-uri");
    const attributes = (() => {
      if (printerUri && jobId) {
        return getJobAttributez(printerUri, jobId);
      } else if (jobUri) {
        return getJobAttributez(jobUri);
      }
      return undefined;
    })();
    if (!attributes) {
      throw new Error("implement me");
    }

    const response: Message = {
      version: request.version,
      requestId: request.requestId,
      operationIdOrStatusCode: successfulOk,
      attributeGroups: [
        {
          groupTag: operationAttributesTag,
          attributes: [
            {
              name: "attributes-charset",
              values: [new CharsetValue("utf-8")]
            },
            {
              name: "attributes-natural-language",
              values: [new NaturalLanguageValue("en-us")]
            }
          ]
        },
        {
          groupTag: jobAttributesTag,
          attributes
        }
      ]
    };
    return response;
  }
}

function getString(
  attributeGroup: AttributeGroup,
  name: string
): string | undefined {
  const matches = attributeGroup.attributes.filter(attr => attr.name === name);
  if (matches.length === 1) {
    const attribute = matches[0];
    const { value, valueTag } = attribute.values[0];
    switch (valueTag) {
      case ValueTag.nameWithoutLanguage:
        return new NameWithoutLanguageValue(value).name;
      case ValueTag.nameWithLanguage:
        return new NameWithLanguageValue(value).name;
      case ValueTag.textWithoutLanguage:
        return new TextWithoutLanguageValue(value).text;
      case ValueTag.textWithLanguage:
        return new TextWithLanguageValue(value).text;
      case ValueTag.mimeMediaType:
        return new MimeMediaTypeValue(value).mimeMediaType;
      case ValueTag.keyword:
        return new KeywordValue(value).keyword;
      case ValueTag.naturalLanguage:
        return new NaturalLanguageValue(value).language;
      case ValueTag.uri:
        return new UriValue(value).uri;
      default:
        return undefined;
    }
  }
  return undefined;
}
function getNumber(
  attributeGroup: AttributeGroup,
  name: string
): number | undefined {
  const matches = attributeGroup.attributes.filter(attr => attr.name === name);
  if (matches.length === 1) {
    const attribute = matches[0];
    const { value, valueTag } = attribute.values[0];
    switch (valueTag) {
      case ValueTag.integer:
        return new IntegerValue(value).integer;
      case ValueTag.enum:
        return new EnumValue(value).enum;
      default:
        return undefined;
    }
  }
  return undefined;
}
