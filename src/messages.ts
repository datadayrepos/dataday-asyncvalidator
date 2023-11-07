import type { InternalValidateMessages } from './interface'

export function newMessages(): InternalValidateMessages {
  return {
    array: {
      len: '%s must be exactly %s in length',
      max: '%s cannot be greater than %s in length',
      min: '%s cannot be less than %s in length',
      range: '%s must be between %s and %s in length',
    },
    clone() {
      const cloned = JSON.parse(JSON.stringify(this))
      cloned.clone = this.clone
      return cloned
    },
    date: {
      format: '%s date %s is invalid for format %s',
      invalid: '%s date %s is invalid',
      parse: '%s date could not be parsed, %s is invalid ',
    },
    default: 'Validation error on field %s',
    enum: '%s must be one of %s',
    number: {
      len: '%s must equal %s',
      max: '%s cannot be greater than %s',
      min: '%s cannot be less than %s',
      range: '%s must be between %s and %s',
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s',
    },
    required: '%s is required',
    string: {
      len: '%s must be exactly %s characters',
      max: '%s cannot be longer than %s characters',
      min: '%s must be at least %s characters',
      range: '%s must be between %s and %s characters',
    },
    types: {
      array: '%s is not an %s',
      boolean: '%s is not a %s',
      date: '%s is not a %s',
      email: '%s is not a valid %s',
      float: '%s is not a %s',
      hex: '%s is not a valid %s',
      integer: '%s is not an %s',
      method: '%s is not a %s (function)',
      number: '%s is not a %s',
      object: '%s is not an %s',
      regexp: '%s is not a valid %s',
      string: '%s is not a %s',
      url: '%s is not a valid %s',
    },
    whitespace: '%s cannot be empty',
  }
}

export const messages = newMessages()
