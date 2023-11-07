import type {
  ExecuteValidator,
} from '../interface'

import string from './string'
import method from './method'
import number from './number'
import boolean from './boolean'
import regexp from './regexp'
import integer from './integer'
import float from './float'
import array from './array'
import object from './object'
import enumValidator from './enum'
import pattern from './pattern'
import date from './date'
import required from './required'
import type from './type'
import any from './any'

// Create an interface with an index signature
export interface ValidatorsIndex {
  [key: string]: ExecuteValidator
}

// Then extend the default export object with this index signature
const validators: ValidatorsIndex = {
  any,
  array,
  boolean,
  date,
  email: type,
  enum: enumValidator,
  float,
  hex: type,
  integer,
  method,
  number,
  object,
  pattern,
  regexp,
  required,
  string,
  url: type,
  // ... any other validator
} as ValidatorsIndex

export default validators
