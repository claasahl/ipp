export * from "../low-level/constants";
import {
  NoValue,
  UnknownValue,
  UnsupportedValue,
  BegCollectionValue,
  EndCollectionValue
} from "./values";

/**
 *  +-----------------+-------------+
 *  | Tag Value (Hex) | Meaning     |
 *  +-----------------+-------------+
 *  | 0x10            | unsupported |
 *  +-----------------+-------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 */
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
export const noValue = new NoValue();

/**
 * +---------------+---------------------------------------------------+
 * | Tag Value     | Meaning                                           |
 * | (Hex)         |                                                   |
 * +---------------+---------------------------------------------------+
 * | 0x34          | begCollection                                     |
 * +---------------+---------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 * https://tools.ietf.org/html/rfc8010#section-3.1.6
 */
export const begCollection = new BegCollectionValue();

/**
 * +---------------+---------------------------------------------------+
 * | Tag Value     | Meaning                                           |
 * | (Hex)         |                                                   |
 * +---------------+---------------------------------------------------+
 * | 0x37          | endCollection                                     |
 * +---------------+---------------------------------------------------+
 *
 * https://tools.ietf.org/html/rfc8010#section-3.5.2
 * https://tools.ietf.org/html/rfc8010#section-3.1.6
 */
export const endCollection = new EndCollectionValue();
