import { Value } from "./types";
import { ValueTag } from "../low-level/constants";

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | textWithoutLanguage, | LOCALIZED-STRING                           |
 * | nameWithoutLanguage  |                                            |
 * +----------------------+--------------------------------------------+
 * | textWithLanguage     | OCTET-STRING consisting of four fields: a  |
 * |                      | SIGNED-SHORT, which is the number of       |
 * |                      | octets in the following field; a value of  |
 * |                      | type natural-language; a SIGNED-SHORT,     |
 * |                      | which is the number of octets in the       |
 * |                      | following field; and a value of type       |
 * |                      | textWithoutLanguage.  The length of a      |
 * |                      | textWithLanguage value MUST be 4 + the     |
 * |                      | value of field a + the value of field c.   |
 * +----------------------+--------------------------------------------+
 * | nameWithLanguage     | OCTET-STRING consisting of four fields: a  |
 * |                      | SIGNED-SHORT, which is the number of       |
 * |                      | octets in the following field; a value of  |
 * |                      | type natural-language; a SIGNED-SHORT,     |
 * |                      | which is the number of octets in the       |
 * |                      | following field; and a value of type       |
 * |                      | nameWithoutLanguage.  The length of a      |
 * |                      | nameWithLanguage value MUST be 4 + the     |
 * |                      | value of field a + the value of field c.   |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 * | boolean              | SIGNED-BYTE where 0x00 is 'false' and 0x01 |
 * |                      | is 'true'                                  |
 * +----------------------+--------------------------------------------+
 * | integer and enum     | a SIGNED-INTEGER                           |
 * +----------------------+--------------------------------------------+
 * | dateTime             | OCTET-STRING consisting of eleven octets   |
 * |                      | whose contents are defined by              |
 * |                      | "DateAndTime" in RFC 2579 [RFC2579]        |
 * +----------------------+--------------------------------------------+
 * | resolution           | OCTET-STRING consisting of nine octets of  |
 * |                      | two SIGNED-INTEGERs followed by a SIGNED-  |
 * |                      | BYTE.  The first SIGNED-INTEGER contains   |
 * |                      | the value of cross-feed direction          |
 * |                      | resolution.  The second SIGNED-INTEGER     |
 * |                      | contains the value of feed direction       |
 * |                      | resolution.  The SIGNED-BYTE contains the  |
 * |                      | units value.                               |
 * +----------------------+--------------------------------------------+
 * | rangeOfInteger       | Eight octets consisting of two SIGNED-     |
 * |                      | INTEGERs.  The first SIGNED-INTEGER        |
 * |                      | contains the lower bound and the second    |
 * |                      | SIGNED-INTEGER contains the upper bound.   |
 * +----------------------+--------------------------------------------+
 * | 1setOf X             | Encoding according to the rules for an     |
 * |                      | attribute with more than one value.  Each  |
 * |                      | value X is encoded according to the rules  |
 * |                      | for encoding its type.                     |
 * +----------------------+--------------------------------------------+
 * | octetString          | OCTET-STRING                               |
 * +----------------------+--------------------------------------------+
 * | collection           | Encoding as defined in Section 3.1.6.      |
 * +----------------------+--------------------------------------------+
 */
export class TextWithoutLanguage implements Value {
  private _value: Buffer = Buffer.from([]);
  private _text: string = "";
  get text() {
    return this._text;
  }
  set text(value: string) {
    this._value = Buffer.from(value, "utf8");
    this._text = value;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._value = value;
    this._text = value.toString("utf8");
  }
  public valueTag = ValueTag.textWithoutLanguage;
}
export class NameWithoutLanguage implements Value {
  private _value: Buffer = Buffer.from([]);
  private _name: string = "";
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._value = Buffer.from(value, "utf8");
    this._name = value;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._value = value;
    this._name = value.toString("utf8");
  }
  public valueTag = ValueTag.nameWithoutLanguage;
}
export class TextWithLanguage implements Value {
  private _value: Buffer = Buffer.from([]);
  private _language: string = "";
  private _text: string = "";
  get language() {
    return this._text;
  }
  set language(value: string) {
    const languageLen = value.length;
    const textLen = this._text.length;
    const buffer = Buffer.alloc(4 + languageLen + textLen);
    buffer.writeIntBE(languageLen, 0, 2);
    buffer.write(value, 2, "utf8");
    buffer.writeIntBE(textLen, 2 + languageLen, 2);
    buffer.write(this._text, 4 + languageLen, "utf8");

    this._language = value;
    this._value = buffer;
  }
  get text() {
    return this._text;
  }
  set text(value: string) {
    const languageLen = this._language.length;
    const textLen = value.length;
    const buffer = Buffer.alloc(4 + languageLen + textLen);
    buffer.writeIntBE(languageLen, 0, 2);
    buffer.write(this._language, 2, "utf8");
    buffer.writeIntBE(textLen, 2 + languageLen, 2);
    buffer.write(value, 4 + languageLen, "utf8");

    this._text = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const languageLen = this._value.readIntBE(0, 2);
    const text = this._value.slice(2, 2 + languageLen).toString("utf8");
    const textLen = this._value.readIntBE(2 + languageLen, 2);
    const language = this._value
      .slice(2 + languageLen, 2 + textLen)
      .toString("utf8");

    this._text = text;
    this._language = language;
    this._value = value;
  }
  public valueTag = ValueTag.textWithLanguage;
}
class NameWithLanguage implements Value {
  private _value: Buffer = Buffer.from([]);
  private _language: string = "";
  private _name: string = "";
  get language() {
    return this._name;
  }
  set language(value: string) {
    const languageLen = value.length;
    const nameLen = this._name.length;
    const buffer = Buffer.alloc(4 + languageLen + nameLen);
    buffer.writeIntBE(languageLen, 0, 2);
    buffer.write(value, 2, "utf8");
    buffer.writeIntBE(nameLen, 2 + languageLen, 2);
    buffer.write(this._name, 4 + languageLen, "utf8");

    this._language = value;
    this._value = buffer;
  }
  get name() {
    return this._name;
  }
  set name(value: string) {
    const languageLen = this._language.length;
    const nameLen = value.length;
    const buffer = Buffer.alloc(4 + languageLen + nameLen);
    buffer.writeIntBE(languageLen, 0, 2);
    buffer.write(this._language, 2, "utf8");
    buffer.writeIntBE(nameLen, 2 + languageLen, 2);
    buffer.write(value, 4 + languageLen, "utf8");

    this._name = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const languageLen = this._value.readIntBE(0, 2);
    const name = this._value.slice(2, 2 + languageLen).toString("utf8");
    const nameLen = this._value.readIntBE(2 + languageLen, 2);
    const language = this._value
      .slice(2 + languageLen, 2 + nameLen)
      .toString("utf8");

    this._name = name;
    this._language = language;
    this._value = value;
  }
  public valueTag = ValueTag.textWithLanguage;
}
type charset = string;
type naturalLanguage = string;
type mimeMediaType = string;
type keyword = string;
type uri = string;
type uriScheme = string;
// type boolean = 1 | 0
// type integer = number
// type enum = number
interface dateTime {}
interface resolution {
  crossFeed: number;
  feed: number;
  units: number;
}
interface rangeOfInteger {
  lowerBound: number;
  upperBound: number;
}
