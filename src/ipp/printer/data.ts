import decamelize from "decamelize";

import {
  Job,
  JobState,
  JobStateReason,
  Printer,
  Compression,
  PdlOverride,
  PrinterState,
  PrinterStateReason,
  Authentication,
  PrinterSecurity,
  PrinterStateReasonSeverity
} from "./types";
import * as Values from "../simple";

const { jobAttributesTag } = Values.BeginAttributeGroupTag;
const bootTime = Date.now();

const printer: Printer = {
  charsetConfigured: "utf-8",
  charsetSupported: "utf-8",
  compressionSupported: Compression.none,
  documentFormatDefault: "application/postscript",
  documentFormatSupported: "application/postscript",
  generatedNaturalLanguageSupported: "en-us",
  ippVersionsSupported: "1.1",
  naturalLanguageConfigured: "en-us",
  operationsSupported: [
    Values.OperationId.PrintJob,
    Values.OperationId.ValidateJob,
    Values.OperationId.CancelJob,
    Values.OperationId.GetJobAttributes,
    Values.OperationId.GetJobs,
    Values.OperationId.GetPrinterAttributes
  ],
  pdlOverrideSupported: PdlOverride.notAttempted,
  printerName: "mr. printer",
  printerIsAcceptingJobs: true,
  printerState: PrinterState.idle,
  printerStateReasons: PrinterStateReason.none,
  get printerUpTime() {
    return Math.round((bootTime - Date.now()) / 1000);
  },
  printerUriSupported: "http://localhost:3000",
  get queuedJobCount() {
    return queue.length;
  },
  uriAuthenticationSupported: Authentication.none,
  uriSecuritySupported: PrinterSecurity.none
};

const printers: Printer[] = [printer];
const queue: Job[] = [];
const documents: Map<number, Buffer> = new Map();
let nextJobId = 1;

export function getPrinterAttributes(
  printerUri: string
): ReadonlyArray<Values.Attribute> | undefined {
  return [
    ...printers
      .filter(printer => printer.printerUriSupported === printerUri)
      .map(toPrinterAttributes)
  ].pop();
}

export function getJobs(
  printerUri: string
): ReadonlyArray<Values.AttributeGroup> {
  return queue
    .filter(job => job.jobPrinterUri === printerUri)
    .map(toJobAttributes)
    .map(attributes => ({ groupTag: jobAttributesTag, attributes }));
}

export function getJobAttributes(
  jobUri: string
): ReadonlyArray<Values.Attribute> | undefined;
export function getJobAttributes(
  printerUri: string,
  jobId: number
): ReadonlyArray<Values.Attribute> | undefined;
export function getJobAttributes(
  uri: string,
  jobId?: number
): ReadonlyArray<Values.Attribute> | undefined {
  if (typeof jobId === "number") {
    return [
      ...queue
        .filter(job => job.jobPrinterUri === uri && job.jobId === jobId)
        .map(toJobAttributes)
    ].pop();
  }
  return [
    ...queue.filter(job => job.jobUri === uri).map(toJobAttributes)
  ].pop();
}

export function printJob(
  printerUri: string,
  document: Buffer
): ReadonlyArray<Values.Attribute> | undefined {
  const printer = [
    ...printers.filter(printer => printer.printerUriSupported === printerUri)
  ].pop();
  if (typeof printer === "undefined") {
    return undefined;
  }
  const timeAtCreation = printer.printerUpTime;
  const jobId = nextJobId++;
  const job: Job = {
    jobName: `job-name-${jobId}`,
    attributesCharset: "utf-8",
    attributesNaturalLanguage: "en-us",
    jobId,
    jobOriginatingUserName: undefined,
    jobPrinterUpTime: printer.printerUpTime,
    jobPrinterUri: printerUri,
    jobState: JobState.processing,
    jobStateReasons: JobStateReason.none,
    jobUri: `${printerUri}/jobs/${jobId}`,
    timeAtCompleted: undefined,
    get timeAtCreation() {
      return (printer?.printerUpTime || 0) - timeAtCreation;
    },
    timeAtProcessing: undefined
  };
  queue.push(job);
  documents.set(job.jobId, document);
  return getJobAttributes(printerUri, job.jobId);
}

export function validateJob(printerUri: string): boolean {
  return !!getPrinterAttributes(printerUri);
}

function toPrinterAttributes(printer: Printer): Values.Attribute[] {
  return [
    {
      name: "charsetConfigured",
      values: [new Values.CharsetValue(printer.charsetConfigured)]
    },
    {
      name: "charsetSupported",
      values: [new Values.CharsetValue(printer.charsetSupported)]
    },
    {
      name: "compressionSupported",
      values: [
        new Values.KeywordValue(Compression[printer.compressionSupported])
      ]
    },
    {
      name: "documentFormatDefault",
      values: [new Values.MimeMediaTypeValue(printer.documentFormatDefault)]
    },
    {
      name: "documentFormatSupported",
      values: [new Values.MimeMediaTypeValue(printer.documentFormatSupported)]
    },
    {
      name: "generatedNaturalLanguageSupported",
      values: [
        new Values.NaturalLanguageValue(
          printer.generatedNaturalLanguageSupported
        )
      ]
    },
    {
      name: "ippVersionsSupported",
      values: [new Values.KeywordValue(printer.ippVersionsSupported)]
    },
    {
      name: "naturalLanguageConfigured",
      values: [
        new Values.NaturalLanguageValue(printer.naturalLanguageConfigured)
      ]
    },
    {
      name: "operationsSupported",
      values: printer.operationsSupported.map(
        operationId => new Values.EnumValue(operationId)
      )
    },
    {
      name: "pdlOverrideSupported",
      values: [
        new Values.KeywordValue(PdlOverride[printer.pdlOverrideSupported])
      ]
    },
    {
      name: "printerName",
      values: [new Values.NameWithoutLanguageValue(printer.printerName)]
    },
    {
      name: "printerIsAcceptingJobs",
      values: [new Values.BooleanValue(printer.printerIsAcceptingJobs)]
    },
    {
      name: "printerState",
      values: [new Values.EnumValue(printer.printerState)]
    },
    {
      name: "printerStateReasons",
      values: [
        new Values.KeywordValue(
          (() => {
            if (typeof printer.printerStateReasons === "object") {
              return `${
                PrinterStateReason[printer.printerStateReasons.reason]
              }-${
                PrinterStateReasonSeverity[printer.printerStateReasons.severity]
              }`;
            }
            return PrinterStateReason[printer.printerStateReasons];
          })()
        )
      ]
    },
    {
      name: "printerUpTime",
      values: [new Values.IntegerValue(printer.printerUpTime)]
    },
    {
      name: "printerUriSupported",
      values: [new Values.UriValue(printer.printerUriSupported)]
    },
    {
      name: "queuedJobCount",
      values: [new Values.IntegerValue(printer.queuedJobCount)]
    },
    {
      name: "uriAuthenticationSupported",
      values: [
        new Values.KeywordValue(
          Authentication[printer.uriAuthenticationSupported]
        )
      ]
    },
    {
      name: "uriSecuritySupported",
      values: [
        new Values.KeywordValue(PrinterSecurity[printer.uriSecuritySupported])
      ]
    }
  ].map(attr => ({ ...attr, name: decamelize(attr.name, "-") }));
}

function toJobAttributes(job: Job): Values.Attribute[] {
  return [
    {
      name: "jobName",
      values: [new Values.NameWithoutLanguageValue(job.jobName)]
    },
    {
      name: "attributesCharset",
      values: [new Values.CharsetValue(job.attributesCharset)]
    },
    {
      name: "attributesNaturalLanguage",
      values: [new Values.NaturalLanguageValue(job.attributesNaturalLanguage)]
    },
    { name: "jobId", values: [new Values.IntegerValue(job.jobId)] },
    {
      name: "jobOriginatingUserName",
      values: [
        job.jobOriginatingUserName
          ? new Values.NameWithoutLanguageValue(job.jobOriginatingUserName)
          : new Values.NoValue()
      ]
    },
    {
      name: "jobPrinterUpTime",
      values: [new Values.IntegerValue(job.jobPrinterUpTime)]
    },
    { name: "jobPrinterUri", values: [new Values.UriValue(job.jobPrinterUri)] },
    { name: "jobState", values: [new Values.EnumValue(job.jobState)] },
    {
      name: "jobStateReasons",
      values: [new Values.KeywordValue(JobStateReason[job.jobStateReasons])]
    },
    { name: "jobUri", values: [new Values.UriValue(job.jobUri)] },
    {
      name: "timeAtCompleted",
      values: [
        job.timeAtCompleted
          ? new Values.IntegerValue(job.timeAtCompleted)
          : new Values.NoValue()
      ]
    },
    {
      name: "timeAtCreation",
      values: [new Values.IntegerValue(job.timeAtCreation)]
    },
    {
      name: "timeAtProcessing",
      values: [
        job.timeAtProcessing
          ? new Values.IntegerValue(job.timeAtProcessing)
          : new Values.NoValue()
      ]
    }
  ].map(attr => ({ ...attr, name: decamelize(attr.name, "-") }));
}
