const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;
const readLine = require('readline');

// Build the connection string and set the connection timeout. 
// the time is measured in milliseconds.

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {  
    }), 1000);
}

// This monitors the connection events. 
mongoose.connection.on('connected', () =>{ 
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows specific listner 
if(process.platform === 'win32'){
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

// Configure the Shutdown process
const gracefullShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
    });
};

// Event Listeners for shutdown processes.

// Shutdown by nodemon.
process.once('SIGUSR2', () => {
    gracefullShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

// Shutdown by app termination.
process.on('SIGINT', () => {
    gracefullShutdown('app termination');
    process.exit(0);
});

// Shutdown by container termination,
process.on('SIGTERM', () => {
    gracefullShutdown('app shutdown');
    process.exit(0);
});

/* Initial connection to Database */
connect();

require('./travlr');
module.exports = mongoose;
