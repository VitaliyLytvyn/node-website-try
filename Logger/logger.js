const chalk = require('chalk')


module.exports.logd = (msg) => console.log((msg instanceof Object) ? msg : chalk.green(msg))
module.exports.logd_inv = (msg) => console.log((msg instanceof Object) ? msg : chalk.green.inverse(msg))
module.exports.logw = (msg) => console.log((msg instanceof Object) ? msg : chalk.yellow(msg))
module.exports.logw_inv = (msg) => console.log((msg instanceof Object) ? msg : chalk.yellow.inverse(msg))
module.exports.loge = (msg) => console.log((msg instanceof Object) ? msg : chalk.bold.red(msg))
module.exports.loge_inv = (msg) => console.log((msg instanceof Object) ? msg : chalk.bold.red.inverse(msg))