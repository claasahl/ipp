import { Attribute, Value } from "./types";

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
export class SetOfValue<T extends Value> implements Attribute {
  public name: string = "";
  public values: T[] = [];
}

// const a = new SetOfValue<NoValue>();
// a.values[0] = new UnknownValue()
// a.values[0] = new BooleanValue()
// a.values[0] = new NoValue()
// a.values[0] = ""
// a.values.push(noValue)
// a.values.push(noValue)
// a.values.push(unknownValue)

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
// export class CollectionValue implements Attribute {}
