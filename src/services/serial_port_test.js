const EventEmitter = require('events');
var serialport = require('serialport');
const SerialPort = require('serialport/test');
const MockBinding = SerialPort.Binding;
var io = require('./socket_io');
var debug = require('debug')('server:serial_port_test');


// Create a port and enable the echo and recording.
MockBinding.createPort('/dev/ROBOT', {
    echo: true,
    record: true
})

class SerialPortService extends EventEmitter {
    constructor() {
        super();
        var port = new SerialPort('/dev/ROBOT', {
            baudRate: 9600
            //     // parser: serialport.parsers.readline("\n")
        });
        // Read the port data
        port.on("open", function () {
            debug('open port');

            port.on('data', function (data) {
                debug('received data: sensorId: %s, status: %s', data[0], data[1]);


                if (!Buffer.isBuffer(data)) {
                    debug('data parsed is not a buffer');
                    return;
                }
                io.sendSerialPortData(data[0], (data[1] == 1) ? 'occupied' : 'free');

                setTimeout(() => {
                    debug('sending data to loopback serial port');
                    let buffer = new Buffer([Math.round(Math.random() * 3), Math.round(Math.random())]);
                    port.write(buffer);
                }, 500)
            });
        });

        // Open errors will be emitted as an error event
        port.on('error', function (err) {
            // console.log('Error: ', err.message);
            this.emit('error', err.message);
        })
    }
}

module.exports = SerialPortService;