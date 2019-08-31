export namespace ObjectUtil {
  // https://github.com/Microsoft/TypeScript/pull/12253
  export const keys = <T>(val: T & object): readonly (keyof T)[] => {
    const keys = []
    for (const key in val) if (val.hasOwnProperty(key)) keys.push(key)
    return keys
  }

  // https://github.com/Microsoft/TypeScript/pull/12253
  export const values = <T>(val: T & object): readonly T[keyof T][] => {
    const vals = []
    for (const key in val) if (val.hasOwnProperty(key)) vals.push(val[key])
    return vals
  }

  // https://github.com/Microsoft/TypeScript/pull/12253
  export const entries = <T>(
    val: T & object
  ): readonly [keyof T, T[keyof T]][] => keys(val).map(key => [key, val[key]])

  export const defaultIfAbsent = <T, V>(
    obj: T,
    key: keyof T,
    fallback: V | T[keyof T]
  ): V | T[keyof T] => (key in obj ? obj[key] : fallback)

  export const hasKey = <T>(val: T, key: keyof any): key is keyof T =>
    key in val

  export const isObject = (val: any): val is object =>
    val && val.constructor === Object
}
