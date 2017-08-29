<h1 align="center">
  <!-- Logo -->
  <br/>
  ansi-log
	<br/>

  <!-- Stability -->
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-stable-brightgreen.svg?style=flat-square" alt="API stability"/>
  </a>
  <!-- Standard -->
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square" alt="Standard"/>
  </a>
  <!-- NPM version -->
  <a href="https://npmjs.org/package/ansi-log"s>
    <img src="https://img.shields.io/npm/v/ansi-log.ssvg?style=flat-square" alt="NPM version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/ansi-log"s>
    <img src="https://img.shields.io/npm/dm/ansi-log.ssvg?style=flat-square" alt="Downloads"/>
  </a>
</h1>

Isomorphic logging with [ANSI styles](See https://en.wikipedia.org/wiki/ANSI_escape_code#graphics).

# Installation

```console
npm install ansi-log
```

# Example

```javascript
import chalk from 'chalk'
import ansiLog from 'ansi-log'

ansiLog(chalk.red('Hello') + chalk.blue('World')) // Console log with appropriate colors.
ansiLog('MyMessage', 'error') // Uses console.error
ansiLog('MyMessage', 'warn') // Uses console.warn
```

### Contributions

* Use `npm test` to run tests.

Please feel free to create a PR!
