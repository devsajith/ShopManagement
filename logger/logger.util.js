//Importing Winston, A versatile logging library, and extracting required modules.
const { createLogger, format, transports } = require('winston');
    // Combining multiple formatting options to structure logoutput
const logFormat = format.combine(
    // Adds a timestamp to the log 
    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
)

    // File based tranport configuration to log messages into a file        const fileTransport =
    new transports.File({
        //file path where logs will be saved
        filename: './logs/server.log',
        //Applying the custom log format to the file transport
        format: logFormat
    });

    const fileTransport =
    new transports.File({
        filename: './logs/server.log',
        format: logFormat
    });
const consoleTransport = new transports.Console(
    //console transport configuration to log messages to the terminal
    {
        format: logFormat
    }
);



//Logger configuration object defining transports 
const logConfiguration = {
    'transports': [
        consoleTransport,
        fileTransport
    ]
};
//Creating a logger instance using the defined configuration
const logger = createLogger(logConfiguration);

//Exporting the logger instance 
module.exports = logger;