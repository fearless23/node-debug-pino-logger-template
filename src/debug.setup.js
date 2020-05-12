const debug = require('debug');

const ERROR_TYPES = {
  MONGO: 'MONGO',
  REDIS: 'REDIS',
  AUTH: 'AUTH',
};

const INFO_TYPES = {
  ANY: 'ANY',
};

const debugErrorLogs = {
  [ERROR_TYPES.MONGO]: (data) => debug('ERROR:MONGO')(data),
  [ERROR_TYPES.REDIS]: (data) => debug('ERROR:REDIS')(data),
  [ERROR_TYPES.AUTH]: (data) => debug('ERROR:AUTH')(data),
};

const debugInfoLogs = {
  [INFO_TYPES.ANY]: (data) => debug('INFO:ANY')(data),
};

const showErrorLog = (type, data) => {
  debugErrorLogs[type](data);
};

const showInfoLog = (type, data) => {
  debugInfoLogs[type](data);
};

class CustomError extends Error {
  constructor({ type, httpCode, msg, userMsg, customCode }, show = false) {
    super();
    this.data = { type, httpCode, msg, userMsg, customCode };
    this.type = type;
    this.userData = { httpCode, userMsg, customCode };

    if (show) showErrorLog(type, this.data);
  }
}

class SendToUser extends Error {
  constructor({ httpCode, userMsg, customCode }) {
    super();
    this.data = { httpCode, userMsg, customCode };
  }
}

module.exports = { showErrorLog, showInfoLog, CustomError, SendToUser, ERROR_TYPES, INFO_TYPES };
