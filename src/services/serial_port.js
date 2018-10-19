var SerialPort = require('serialport');
const EventEmitter = require('events');

class SerialPortService extends EventEmitter {
    constructor(port) {
        super();
        this.port = new SerialPort(port, {
            baudrate: 9600,
            parser: serialport.parsers.readline("\n")
        });
        // Read the port data
        port.on("open", function () {
            console.log('open');
            this.emit('open');
            port.on('data', function (data) {
                console.log(data);
                this.emit('data', data);
            });
        });

        // Open errors will be emitted as an error event
        port.on('error', function (err) {
            console.log('Error: ', err.message);
            this.emit('error', err.message);
        })
    }
}

module.exports = SerialPortService;