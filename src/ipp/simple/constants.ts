import { Value } from "./types";
import { ValueTag } from "../low-level/constants";

/**
 *  +-----------------+-------------+
 *  | Tag Value (Hex) | Meaning     |
 *  +-----------------+-------------+
 *  | 0x10            | unsupported |
 *  +-----------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
class UnsupportedValue implements Value {
  public readonly value = Buffer.alloc(0);
  public readonly valueTag = ValueTag.unsupported;
}
export const unsupportedValue = new UnsupportedValue();

/**
 *  +-----------------+-------------+
 *  | Tag Value (Hex) | Meaning     |
 *  +-----------------+-------------+
 *  | 0x12            | unknown     |
 *  +-----------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
class UnknownValue implements Value {
  public readonly value = Buffer.alloc(0);
  public readonly valueTag = ValueTag.unknown;
}
export const unknownValue = new UnknownValue();

/**
 *  +-----------------+-------------+
 *  | Tag Value (Hex) | Meaning     |
 *  +-----------------+-------------+
 *  | 0x13            | no-value    |
 *  +-----------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
class NoValue implements Value {
  public readonly value = Buffer.alloc(0);
  public readonly valueTag = ValueTag.noValue;
}
export const noValue = new NoValue();
