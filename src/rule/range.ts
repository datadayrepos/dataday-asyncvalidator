import type { ExecuteRule, ValidateMessages } from '../interface'
import { format } from '../util'

const range: ExecuteRule = (rule, value, source, errors, options) => {
  const len = typeof rule.len === 'number'
  const min = typeof rule.min === 'number'
  const max = typeof rule.max === 'number'
  // Regular expression matches text in the code point range from U+010000 to U+10FFFF (complementing the Supplementary Plane)
  const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
  let val = value

  // Declare key with all possible values it might hold
  let key: 'number' | 'string' | 'array' | null = null

  if (typeof value === 'number')
    key = 'number'

  else if (typeof value === 'string')
    key = 'string'

  else if (Array.isArray(value))
    key = 'array'

  // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type
  if (!key)
    return false

  // Now TypeScript knows that `key` is safe to use for indexing `options.messages.types`
  const typeMessages = options.messages?.types?.[key]
  if (!typeMessages)
    return false // Or handle the case where there are no messages for the given type

  // Now we access the nested properties using the known safe keys.
  if (Array.isArray(value))
    val = value.length

  if (typeof value === 'string') {
    // Deals with the bug where the length attribute is inaccurate for text with code points greater than U+010000.length !== 3
    val = value.replace(spRegexp, '_').length
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(
        format(
          (options.messages?.[key]?.len ?? '') || '', // default value for options.messages when it's undefined.  nullish coalescing operator ??
          rule.fullField,
          rule.len,
        ),
      )
    }
  }
  else if (min && !max && rule.min && val < rule.min) {
    errors.push(
      format(
        (options.messages?.[key]?.min ?? '') || '',
        rule.fullField,
        rule.min,
      ),
    )
  }
  else if (max && !min && val > (rule.max ?? 0)) {
    errors.push(
      format(
        (options.messages?.[key]?.max ?? '') || '',
        rule.fullField,
        rule.max,
      ),
    )
  }
  else if (min && max && (val < (rule.min ?? 0) || val > (rule.max ?? 0))) {
    errors.push(
      format(
        (options.messages?.[key]?.range ?? '') || '',
        rule.fullField,
        rule.min,
        rule.max,
      ),
    )
  }
}

export default range
