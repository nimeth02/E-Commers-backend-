const logger = require('pino')(
    {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore :'pid,hostname',
            translateTime :'SYS:MM:ss'
          }
        }
      }

)

 module.exports =logger