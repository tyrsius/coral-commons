/* */ 
const fnToString = (fn) => Function.prototype.toString.call(fn)

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  const proto = typeof obj.constructor === 'function' ?
    Object.getPrototypeOf(obj) :
    Object.prototype

  if (proto === null) {
    return true
  }

  const constructor = proto.constructor

  return typeof constructor === 'function'
    && constructor instanceof constructor
    && fnToString(constructor) === fnToString(Object)
}

module.exports = isPlainObject
