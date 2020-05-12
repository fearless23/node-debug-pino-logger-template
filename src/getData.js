const {
  showErrorLog,
  showInfoLog,
  CustomError,
  SendToUser,
  ERROR_TYPES,
  INFO_TYPES,
} = require('./debug.setup');

const fakeErrCreater = () => {
  const x = Math.random();
  if (x < 0.25)
    throw new CustomError({
      type: ERROR_TYPES.MONGO,
      httpCode: 502,
      msg: 'Mongo DB connection Error',
      userMsg: 'Something happen wrong',
      customCode: '10001',
    });
  if (x < 0.5)
    throw new CustomError({
      type: ERROR_TYPES.REDIS,
      httpCode: 408,
      msg: 'Redis timeout error',
      userMsg: 'Something happen wrong',
      customCode: '10002',
    });
  if (x < 0.75)
    throw new CustomError({
      type: ERROR_TYPES.AUTH,
      httpCode: 401,
      msg: 'Wrong username or password',
      userMsg: 'Wrong username or password',
      customCode: '10003',
    });
  return x.toString(36).substr(2);
};

// METHOD 1: PASS ERROR TO TOP, REQ DATA will be handled in topmost func
function getData() {
  const randID = fakeErrCreater();
  showInfoLog(INFO_TYPES.ANY, 'Random ID has been created');
  return randID;
}

// METHOD 2: LOG HERE, OR SEND ALL DATA UPTO WHERE REQ IS HANDLED TO INCLUDE REQ DATA AS WELL
function getData2() {
  try {
    const randID = fakeErrCreater();
    showInfoLog(INFO_TYPES.ANY, 'Random ID has been created');
    return randID;
  } catch ({ type, data, userData }) {
    showErrorLog(type, data);
    throw new SendToUser(userData);
  }
}

module.exports = { getData, getData2 };
