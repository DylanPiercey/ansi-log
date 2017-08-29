'use strict'

/**
 * Wrapper around console methods, does not do much server side.
 *
 * @param {string} str - the string to log.
 * @param {string} [method='log'] - an optional method to use (log, warn, error, etc).
 */
module.exports = function ansiLog (str, method) {
  console[method || 'log'](str)
}
