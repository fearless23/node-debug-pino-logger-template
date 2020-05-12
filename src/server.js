const { pinoLogger: logger } = require('./pino.setup');
const express = require('express');
const { showErrorLog, showInfoLog } = require('./debug.setup');
const { getData, getData2 } = require('./getData');
// const expressPino = require('express-pino-logger');

const PORT = process.env.PORT || 3000;
const app = express();
// const expressLogger = expressPino({ logger });
// app.use(expressLogger);

app.get('/', (req, res) => {
  // DONT USE THIS, INSTEAD USE CUSTOM DEBUG IF YOU WANT PINO TO BE REPLACEABLE
  // ALTHOUGH, logger.debug can be used as standard format
  // logger.debug('Calling res.send');

  try {
    const id = getData();
    res.status(200).json({ err: false, data: id, msg: 'Custom ID' });
  } catch (err) {
    const { type, data } = err;
    showErrorLog(type, { ...data, url: req.url, reqID: req.id });
    res.status(data.httpCode).json({ err: true, msg: data.userMsg, code: data.customCode });
  }
});

app.get('/2', (req, res) => {
  // DONT USE THIS, INSTEAD USE CUSTOM DEBUG IF YOU WANT PINO TO BE REPLACEABLE
  // ALTHOUGH, logger.debug can be used as standard format
  // logger.debug('Calling res.send');

  try {
    const id = getData2();
    res.status(200).json({ err: false, data: id, msg: 'Custom ID' });
  } catch (err) {
    const { httpCode, userMsg, customCode } = err.data;
    res.status(httpCode).json({ err: true, msg: userMsg, code: customCode });
  }
});

app.listen(PORT, () => {
  showInfoLog('ANY', `Server running on port ${PORT}`);
  // logger.info('Server running on port %d', PORT);
});
