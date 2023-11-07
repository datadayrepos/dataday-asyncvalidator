import type { ExecuteRule } from '../interface'
import { format, isEmptyValue } from '../util'

const required: ExecuteRule = (rule, value, source, errors, options, type) => {
  // Use call to safely check if source has own property
  const hasOwnProperty = Object.prototype.hasOwnProperty.call(source, rule.field ?? '')

  if (
    rule.required
    && (!hasOwnProperty || isEmptyValue(value, type || rule.type))
  )
    errors.push(format(options.messages?.required ?? '', rule.fullField))
}

export default required
