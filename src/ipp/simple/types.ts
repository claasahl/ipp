export type VersionNumber = "1.0" | "1.1" | "2.0";

export interface Message {
  version: VersionNumber;
  operationIdOrStatusCode: number;
  requestId: number;
  attributeGroups: AttributeGroup[];
  data?: Buffer;
}

export interface AttributeGroup {
  groupTag: number;
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  values: Value[];
}

export interface Value {
  valueTag: number;
  value: Buffer;
}
