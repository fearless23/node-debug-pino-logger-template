## NODE JS LOGGING

1. `debug`: Popular node module for debugging with namespaces attached to logs.

   > Express uses debug internally

2. `pino`: Logging System similar to winston, bunyan, roarr

3. `pino-express-logger`: creates logs from express http requests like morgan

4. `pino-debug`: convert all debug module logs to pino format, default: all debug namespaces goes to pino info level 20

5. `pino-pretty`: prettifies logs from pino

6. `pina-colada`: Format for pino-pretty module, use either pino-retty or pino-colada; but pino-colada depends upon pino-colada

> For framework other than express or if no framewroks are used. Replace number 3 with appropriate
> module.

> Use pino-debug if you want debug module logs to transfer into pino formatting.

Q: What if i chang epino to other module?
A: You should use debug inside your code, because you may or may not need pino in every situation like Lambda. And Library developers can use debug as they dont have to transport their logs.
So, create your application with debug module and then use something like `pino-debug` to convert multiple logs into some standard format. Specially, for pino use pino-debug map to map your debug namespaces to pino log levels. like following

```js
const pinoDebug = require('pino-debug');
const pino = require('pino');

const pinoLogger = pino({ level: process.env.LEVEL || 'info' }, process.stderr);
pinoDebug(pinoLogger, {
  auto: true, // default
  map: {
    'example:server': 'info',
    'express:router': 'debug',
    '*': 'trace', // everything else - trace
  },
});
```

> If using pino-debug, dont use debug.

> USe 5 and 6 only in development.

NPM SCRIPTS AND VSCODE LAUNCER/DEBUG

1. Without requiring pino-debug module
- `npm start:local`: Script require `dotenv` only, and `pino-debug` is used in entry file. Make sure it is required and called befor any other thing, even require express should come later, without requiring `pino-debug` program throws an error - debug called before pino-debug initialized. We dont need to require pino-debug in our entry file.js unless we need to map debug namespaces.
- `npm start`: Requires `pino-debug` in production but inside entry file, to convert namespaces and map namespaces.

2. With -r pino-debug
- `npm start2`: Script requires `pino-debug` with `-r` flag in production, to convert debugnamespaces, but no maping can be done.
- `npm start:local2`: Script require `dotenv` and `pino-debug`. We dont need to require pino-debug in our entry file.js unless we need to map debug namespaces. We pipe output to pino-colada for pretty print, we can use pino-pretty.
 

## Summary:

1. Pino-express-logger will do its work just like morgan.
2. Pino-debug will convert debug namespaces using maps.
3. We only use debug in our code., we can replace pino anytime we want with say winston or not use any thing at all.
4. pino logger transports our logs to external service for storage/analysis
5.
