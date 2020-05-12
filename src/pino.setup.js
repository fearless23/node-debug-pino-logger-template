const pinoDebug = require('pino-debug'); // comment this line, if -r flag used in NPM Script
const pino = require('pino');

const pinoLogger = pino({ level: process.env.LEVEL || 'info' });

// If -r flag used in NPM Scripts, this cant be done.
pinoDebug(pinoLogger, {
  // auto: true, // default
  map: {
    'ERROR:*': 'error',
    'INFO:*': 'info',
    '*': 'trace',
  },
});

module.exports = { pinoLogger };
