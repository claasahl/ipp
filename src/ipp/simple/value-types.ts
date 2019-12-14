import printf from "printf";

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
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class TextWithoutLanguageValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _text: string = "";
  get text() {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._text = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.textWithoutLanguage;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | textWithoutLanguage, | LOCALIZED-STRING                           |
 * | nameWithoutLanguage  |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class NameWithoutLanguageValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _name: string = "";
  get name() {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._name = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.nameWithoutLanguage;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
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
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class TextWithLanguageValue implements Value {
  private _value: Buffer = Buffer.from([0, 0, 0, 0]);
  private _language: string = "";
  private _text: string = "";
  get language() {
    return this._language;
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
    const languageLen = value.readIntBE(0, 2);
    const language = value.slice(2, 2 + languageLen).toString("utf8");
    const textLen = value.readIntBE(2 + languageLen, 2);
    const text = value
      .slice(4 + languageLen, 4 + languageLen + textLen)
      .toString("utf8");

    this._language = language;
    this._text = text;
    this._value = value;
  }
  public valueTag = ValueTag.textWithLanguage;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
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
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class NameWithLanguageValue implements Value {
  private _value: Buffer = Buffer.from([0, 0, 0, 0]);
  private _language: string = "";
  private _name: string = "";
  get language() {
    return this._language;
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
    const languageLen = value.readIntBE(0, 2);
    const language = value.slice(2, 2 + languageLen).toString("utf8");
    const nameLen = value.readIntBE(2 + languageLen, 2);
    const name = value
      .slice(4 + languageLen, 4 + languageLen + nameLen)
      .toString("utf8");

    this._language = language;
    this._name = name;
    this._value = value;
  }
  public valueTag = ValueTag.nameWithLanguage;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class CharsetValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _charset: string = "";
  get charset() {
    return this._charset;
  }
  set charset(value: string) {
    this._charset = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._charset = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.charset;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class NaturalLanguageValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _language: string = "";
  get language() {
    return this._language;
  }
  set language(value: string) {
    this._language = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._language = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.naturalLanguage;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class MimeMediaTypeValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _mimeMediaType: string = "";
  get mimeMediaType() {
    return this._mimeMediaType;
  }
  set mimeMediaType(value: string) {
    this._mimeMediaType = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._mimeMediaType = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.mimeMediaType;
}
/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class KeywordValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _keyword: string = "";
  get keyword() {
    return this._keyword;
  }
  set keyword(value: string) {
    this._keyword = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._keyword = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.keyword;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class UriValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _uri: string = "";
  get uri() {
    return this._uri;
  }
  set uri(value: string) {
    this._uri = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._uri = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.uri;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | charset,             | US-ASCII-STRING                            |
 * | naturalLanguage,     |                                            |
 * | mimeMediaType,       |                                            |
 * | keyword, uri, and    |                                            |
 * | uriScheme            |                                            |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class UriSchemeValue implements Value {
  private _value: Buffer = Buffer.from([]);
  private _uriScheme: string = "";
  get uriScheme() {
    return this._uriScheme;
  }
  set uriScheme(value: string) {
    this._uriScheme = value;
    this._value = Buffer.from(value, "utf8");
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    this._uriScheme = value.toString("utf8");
    this._value = value;
  }
  public valueTag = ValueTag.uriScheme;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | boolean              | SIGNED-BYTE where 0x00 is 'false' and 0x01 |
 * |                      | is 'true'                                  |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class BooleanValue implements Value {
  private _value: Buffer = Buffer.from([0]);
  private _flag: boolean = false;
  get flag() {
    return this._flag;
  }
  set flag(value: boolean) {
    this._flag = value;
    this._value = Buffer.from([value ? 1 : 0]);
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const flag = value.readIntBE(0, 1) === 1;

    this._flag = flag;
    this._value = value;
  }
  public valueTag = ValueTag.boolean;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | integer and enum     | a SIGNED-INTEGER                           |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class IntegerValue implements Value {
  private _value: Buffer = Buffer.from([0, 0, 0, 0]);
  private _integer: number = 0;
  get integer() {
    return this._integer;
  }
  set integer(value: number) {
    const buffer = Buffer.alloc(4);
    buffer.writeIntBE(value, 0, 4);

    this._integer = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const integer = value.readIntBE(0, 4);

    this._integer = integer;
    this._value = value;
  }
  public valueTag = ValueTag.integer;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | integer and enum     | a SIGNED-INTEGER                           |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class EnumValue implements Value {
  // TODO make generic?
  private _value: Buffer = Buffer.from([0, 0, 0, 0]);
  private _enum: number = 0;
  get enum() {
    return this._enum;
  }
  set enum(value: number) {
    const buffer = Buffer.alloc(4);
    buffer.writeIntBE(value, 0, 4);

    this._enum = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const integer = value.readIntBE(0, 4);

    this._enum = integer;
    this._value = value;
  }
  public valueTag = ValueTag.enum;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | dateTime             | OCTET-STRING consisting of eleven octets   |
 * |                      | whose contents are defined by              |
 * |                      | "DateAndTime" in RFC 2579 [RFC2579]        |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 *
 * field  octets  contents                  range
 *  -----  ------  --------                  -----
 *   1      1-2   year*                     0..65536
 *   2       3    month                     1..12
 *   3       4    day                       1..31
 *   4       5    hour                      0..23
 *   5       6    minutes                   0..59
 *   6       7    seconds                   0..60
 *                (use 60 for leap-second)
 *   7       8    deci-seconds              0..9
 *   8       9    direction from UTC        '+' / '-'
 *   9      10    hours from UTC*           0..13
 *  10      11    minutes from UTC          0..59
 *
 * https://tools.ietf.org/html/rfc2579#section-2
 */
export class DateTimeValue implements Value {
  private _value: Buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private _dateTime: Date = new Date(0);
  get dateTime() {
    return this._dateTime;
  }
  set dateTime(value: Date) {
    const buffer = Buffer.alloc(11);
    buffer.writeIntBE(value.getUTCFullYear(), 0, 2);
    buffer.writeIntBE(value.getUTCMonth() + 1, 2, 1);
    buffer.writeIntBE(value.getUTCDate(), 3, 1);
    buffer.writeIntBE(value.getUTCHours(), 4, 1);
    buffer.writeIntBE(value.getUTCMinutes(), 5, 1);
    buffer.writeIntBE(value.getUTCSeconds(), 6, 1);
    buffer.writeIntBE(Math.floor(value.getUTCMilliseconds() / 100), 7, 1);
    buffer.write("+", 8, 9, "utf8");
    buffer.writeIntBE(0, 9, 1);
    buffer.writeIntBE(0, 10, 1);

    this._dateTime = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const year = value.readIntBE(0, 2);
    const month = value.readIntBE(2, 1);
    const day = value.readIntBE(3, 1);
    const hour = value.readIntBE(4, 1);
    const minutes = value.readIntBE(5, 1);
    const seconds = value.readIntBE(6, 1);
    const deciSeconds = value.readIntBE(7, 1);
    const directionFromUtc = value.slice(8, 9).toString("utf8");
    const hoursFromUtc = value.readIntBE(9, 1);
    const minutesFromUtc = value.readIntBE(10, 1);
    const t = printf(
      "%04d-%02d-%02dT%02d:%02d:%02d.%03d%s%02d%02d",
      year,
      month,
      day,
      hour,
      minutes,
      seconds,
      deciSeconds * 100,
      directionFromUtc,
      hoursFromUtc,
      minutesFromUtc
    );
    const dateTime = new Date(t);

    this._dateTime = dateTime;
    this._value = value;
  }
  public valueTag = ValueTag.dateTime;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
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
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class ResolutionValue implements Value {
  // TODO make units an enum
  private _value: Buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  private _crossFeed: number = 0;
  private _feed: number = 0;
  private _units: number = 0;
  get crossFeed() {
    return this._crossFeed;
  }
  set crossFeed(value: number) {
    const buffer = Buffer.alloc(9);
    buffer.writeIntBE(value, 0, 4);
    buffer.writeIntBE(this._feed, 4, 4);
    buffer.writeIntBE(this._units, 8, 1);

    this._crossFeed = value;
    this._value = buffer;
  }
  get feed() {
    return this._feed;
  }
  set feed(value: number) {
    const buffer = Buffer.alloc(9);
    buffer.writeIntBE(this._crossFeed, 0, 4);
    buffer.writeIntBE(value, 4, 4);
    buffer.writeIntBE(this._units, 8, 1);

    this._feed = value;
    this._value = buffer;
  }
  get units() {
    return this._units;
  }
  set units(value: number) {
    const buffer = Buffer.alloc(9);
    buffer.writeIntBE(this._crossFeed, 0, 4);
    buffer.writeIntBE(this._feed, 4, 4);
    buffer.writeIntBE(value, 8, 1);

    this._units = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const lowerBound = value.readIntBE(0, 4);
    const upperBound = value.readIntBE(4, 4);
    const units = value.readIntBE(8, 1);

    this._crossFeed = lowerBound;
    this._feed = upperBound;
    this._units = units;
    this._value = value;
  }
  public valueTag = ValueTag.resolution;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | rangeOfInteger       | Eight octets consisting of two SIGNED-     |
 * |                      | INTEGERs.  The first SIGNED-INTEGER        |
 * |                      | contains the lower bound and the second    |
 * |                      | SIGNED-INTEGER contains the upper bound.   |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class RangeOfIntegerValue implements Value {
  private _value: Buffer = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]);
  private _lowerBound: number = 0;
  private _upperBound: number = 0;
  get lowerBound() {
    return this._lowerBound;
  }
  set lowerBound(value: number) {
    const buffer = Buffer.alloc(8);
    buffer.writeIntBE(value, 0, 4);
    buffer.writeIntBE(this._upperBound, 4, 4);

    this._lowerBound = value;
    this._value = buffer;
  }
  get upperBound() {
    return this._upperBound;
  }
  set upperBound(value: number) {
    const buffer = Buffer.alloc(8);
    buffer.writeIntBE(this._lowerBound, 0, 4);
    buffer.writeIntBE(value, 4, 4);

    this._upperBound = value;
    this._value = buffer;
  }
  get value() {
    return this._value;
  }
  set value(value: Buffer) {
    const lowerBound = value.readIntBE(0, 4);
    const upperBound = value.readIntBE(4, 4);

    this._lowerBound = lowerBound;
    this._upperBound = upperBound;
    this._value = value;
  }
  public valueTag = ValueTag.rangeOfInteger;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | 1setOf X             | Encoding according to the rules for an     |
 * |                      | attribute with more than one value.  Each  |
 * |                      | value X is encoded according to the rules  |
 * |                      | for encoding its type.                     |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
//export class SetOfValue implements Value {}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | octetString          | OCTET-STRING                               |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
export class OctetStringValue implements Value {
  public value: Buffer = Buffer.from([]);
  public valueTag = ValueTag.octetString;
}

/**
 * +----------------------+--------------------------------------------+
 * | Syntax of Attribute  | Encoding                                   |
 * | Value                |                                            |
 * +----------------------+--------------------------------------------+
 * | collection           | Encoding as defined in Section 3.1.6.      |
 * +----------------------+--------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.9
 */
//export class CollectionValue implements Value {}
