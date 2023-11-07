import type { ExecuteRule, RuleType, Value } from '../interface'
import { format } from '../util'
import required from './required'
import getUrlRegex from './url'

/* eslint max-len:0 */

const pattern = {
  // http://emailregex.com/
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
}

const types: { [key in RuleType]?: (value: any) => boolean } = {
  array(value: Value) {
    return Array.isArray(value)
  },
  date(value: Value) {
    return (
      typeof value.getTime === 'function'
      && typeof value.getMonth === 'function'
      && typeof value.getYear === 'function'
      && !Number.isNaN(value.getTime())
    )
  },
  email(value: Value) {
    return (
      typeof value === 'string'
      && value.length <= 320
      && !!value.match(pattern.email)
    )
  },
  float(value: Value) {
    if (!types.number || !types.integer)
      throw new Error('types.number or types.integer is not defined')

    return types.number(value) && !types.integer(value)
  },
  hex(value: Value) {
    return typeof value === 'string' && !!value.match(pattern.hex)
  },
  integer(value: Value) {
    if (!types.number)
      throw new Error('types.number is not defined')

    // Now we can safely use types.number as it's guaranteed to be defined
    return types.number(value) && Number.isInteger(value)
  },
  method(value: Value) {
    return typeof value === 'function'
  },
  // Define number first as it's used by float and integer
  number(value: Value) {
    return typeof value === 'number' && !Number.isNaN(value)
  },
  object(value: Value) {
    // Assert that types.array is not undefined before calling
    if (!types.array)
      throw new Error('types.array is not defined')

    return typeof value === 'object' && !Array.isArray(value) && !types.array(value)
  },
  regexp(value: Value) {
    if (value instanceof RegExp)
      return true

    try {
      return !!new RegExp(value)
    }
    catch (e) {
      return false
    }
  },
  url(value: Value) {
    return (
      typeof value === 'string'
      && value.length <= 2048
      && !!value.match(getUrlRegex())
    )
  },
}

/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */
const type: ExecuteRule = (rule, value, source, errors, options) => {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options)
    return
  }
  const custom = [
    'array',
    'date',
    'email',
    'float',
    'hex',
    'integer',
    'method',
    'number',
    'object',
    'regexp',
    'url',
  ]

  const ruleType = rule.type

  if (ruleType) {
    // List of JavaScript primitive types
    const jsPrimitiveTypes = ['string', 'number', 'boolean', 'undefined', 'object', 'function', 'symbol', 'bigint']

    // Check if ruleType is a JavaScript primitive type
    if (jsPrimitiveTypes.includes(ruleType)) {
      const tp = typeof value
      // Perform typeof check
      if (tp !== rule.type) {
        const message = options.messages?.types?.[ruleType as keyof typeof options.messages.types] || `Type of value does not match type ${rule.type}`
        errors.push(format(message, rule.fullField, rule.type))
      }
    }
    else if (custom.includes(ruleType)) {
      // If it's not a JavaScript primitive type, it must be a custom type
      // If the custom validation fails, push an error message
      if (!types[ruleType]!(value)) {
        const message = options.messages?.types?.[ruleType as keyof typeof options.messages.types] || `Invalid custom type ${rule.type}`
        errors.push(format(message, rule.fullField, rule.type))
      }
    }
  }
}

export default type
