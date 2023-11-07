import type { ExecuteRule } from '../interface'
import { format } from '../util'

const ENUM = 'enum' as const

const enumerable: ExecuteRule = (rule, value, _source, errors, options) => {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : []
  if (
    !rule[ENUM].includes(value)
    && options.messages
    && options.messages[ENUM]
  ) {
    errors.push(
      format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')),
    )
  }
}

export default enumerable
