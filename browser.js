'use strict'

var ANSI_REG = require('ansi-regex')()

// See https://en.wikipedia.org/wiki/ANSI_escape_code#graphics
var ON_CODES = {
  '0': 'reset',
  '1': 'bold',
  '2': 'faint',
  '3': 'italic',
  '4': 'underline',
  '8': 'conceal',
  '9': 'crossed-out',
  '30': 'color black',
  '31': 'color red',
  '32': 'color green',
  '33': 'color yellow',
  '34': 'color blue',
  '35': 'color magenta',
  '36': 'color cyan',
  '37': 'color lightgrey',
  '40': 'background black',
  '41': 'background red',
  '42': 'background green',
  '43': 'background yellow',
  '44': 'background blue',
  '45': 'background magenta',
  '46': 'background cyan',
  '47': 'background lightgrey',
  '51': 'frame box',
  '52': 'frame circle',
  '53': 'overline'
}
var OFF_CODES = {
  '21': 'bold',
  '22': 'faint',
  '23': 'italic',
  '24': 'underline',
  '28': 'conceal',
  '29': 'crossed-out',
  '39': 'color',
  '49': 'background',
  '54': 'frame',
  '55': 'overline'
}

// CSS styles for each open code.
var STYLES = {
  'reset': 'font-weight:normal;opacity:1;font-style:normal;visibility:visible;text-decoration:none;color:#000;background:#fff;border:none;border-radius:0',
  'bold': 'font-weight:bold',
  'faint': 'opacity:0.5',
  'italic': 'font-style:italic',
  'conceal': 'visibility:hidden',
  'underline': 'text-decoration:underline',
  'crossed-out': 'text-decoration:line-through',
  'color black': 'color:#000',
  'color red': 'color:#ff0000',
  'color green': 'color:#209805',
  'color yellow': 'color:#e8bf03',
  'color blue': 'color:#0000ff',
  'color magenta': 'color:#ff00ff',
  'color cyan': 'color:#00ffee',
  'color lightgrey': 'color:#f0f0f0',
  'color darkgrey': 'color:#888',
  'background black': 'background:#000',
  'background red': 'background:#ff0000',
  'background green': 'background:#209805',
  'background yellow': 'background:#e8bf03',
  'background blue': 'background:#0000ff',
  'background magenta': 'background:#ff00ff',
  'background cyan': 'background:#00ffee',
  'background lightgrey': 'background:#f0f0f0',
  'background darkgrey': 'background:#888',
  'frame box': 'border: 4px solid black',
  'frame circle': 'border: 4px solid black;border-radius:50%',
  'overline': 'text-decoration:overline'
}

/**
 * Acts like console.log but with support for ansi styling.
 *
 * @param {string} str - the string to log.
 * @param {string} [method='log'] - an optional method to use (log, warn, error, etc).
 */
module.exports = function ansiLog (str, method) {
  method = method || 'log'
  var curCSS = []
  var styles = []
  var stacks = {}
  str = str.replace(ANSI_REG, function (match, pos) {
    const code = match.slice(2, -1) // Trim off \[ and m
    const onCode = ON_CODES[code]
    const offCode = OFF_CODES[code]

    if (onCode) {
      // On open tags add new css and remember position of css.
      const name = onCode.slice(0, onCode.indexOf(' ')) // We group codes by the text before a space.
      const stack = stacks[name] = stacks[name] || [] // Each group has it's own stack that stacks css positions.
      stack.push(curCSS.push(STYLES[onCode] || '') - 1) // Adds the new css to the current css and tracks the position in the stack.
    } else if (offCode) {
      // On closing tags check the stack for the current group and remove css at the last position.
      const stack = stacks[offCode]
      if (stack) curCSS.splice(stack.pop(), 1)
    } else {
      // If we got an unknown style just ignore it.
      return ''
    }

    // Save styles on each code.
    styles.push(curCSS.join(';'))
    return '%c'
  })

  // Log using console styles https://developer.mozilla.org/en/docs/Web/API/console#Styling_console_output
  console[method].apply(console, [str].concat(styles))
}
