import assert from "assert";
import debug from "debug";

import { Message } from "../simple/types";
import {
  OperationId,
  StatusCode,
  BeginAttributeGroupTag
} from "../low-level/constants";
import { readOnly, readWrite } from "./attributes";
import { CharsetValue, NaturalLanguageValue } from "../simple";

const { CancelJob, GetJobAttributes } = OperationId;
const { successfulOk } = StatusCode;
const { operationAttributesTag, jobAttributesTag } = BeginAttributeGroupTag;

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
    // assert.strictEqual(request.version, "1.1")
    assert.strictEqual(request.operationIdOrStatusCode, CancelJob);
    assert.strictEqual(
      request.attributeGroups.filter(
        ({ groupTag }) => groupTag === operationAttributesTag
      ).length,
      1
    );

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
          attributes: [
            { name: "job-name", values: readWrite.jobName },
            { name: "attributes-charse", values: readOnly.attributesCharset },
            {
              name: "attributes-natural-language",
              values: readOnly.attributesNaturalLanguage
            },
            { name: "job-id", values: readOnly.jobId },
            {
              name: "job-originating-user-name",
              values: readOnly.jobOriginatingUserName
            },
            { name: "job-printer-up-time", values: readOnly.jobPrinterUpTime },
            { name: "job-printer-uri", values: readOnly.jobPrinterUri },
            { name: "job-state", values: readOnly.jobState },
            { name: "job-state-reasons", values: readOnly.jobStateReasons },
            { name: "job-uri", values: readOnly.jobUri },
            { name: "time-at-completed", values: readOnly.timeAtCompleted },
            { name: "time-at-creation", values: readOnly.timeAtCreation },
            { name: "time-at-processing", values: readOnly.timeAtProcessing }
          ]
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
          attributes: [
            { name: "job-name", values: readWrite.jobName },
            { name: "attributes-charse", values: readOnly.attributesCharset },
            {
              name: "attributes-natural-language",
              values: readOnly.attributesNaturalLanguage
            },
            { name: "job-id", values: readOnly.jobId },
            {
              name: "job-originating-user-name",
              values: readOnly.jobOriginatingUserName
            },
            { name: "job-printer-up-time", values: readOnly.jobPrinterUpTime },
            { name: "job-printer-uri", values: readOnly.jobPrinterUri },
            { name: "job-state", values: readOnly.jobState },
            { name: "job-state-reasons", values: readOnly.jobStateReasons },
            { name: "job-uri", values: readOnly.jobUri },
            { name: "time-at-completed", values: readOnly.timeAtCompleted },
            { name: "time-at-creation", values: readOnly.timeAtCreation },
            { name: "time-at-processing", values: readOnly.timeAtProcessing }
          ]
        }
      ]
    };
    return response;
  }
}
