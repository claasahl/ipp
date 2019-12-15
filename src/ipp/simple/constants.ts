import { NoValue, UnknownValue, UnsupportedValue } from "./values";

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
