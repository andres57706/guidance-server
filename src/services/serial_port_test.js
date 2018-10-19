const EventEmitter = require('events');
var serialport = require('serialport');
const SerialPort = require('serialport/test');
const MockBinding = SerialPort.Binding;
var io = require('./socket_io');

 
// Create a port and enable the echo and recording.
MockBinding.createPort('/dev/ROBOT', { echo: true, record: true })

class SerialPortService extends EventEmitter {
    constructor() {
        super();
        var port = new SerialPort('/dev/ROBOT', {
            baudRate: 9600
        //     // parser: serialport.parsers.readline("\n")
        });
        // Read the port data
        port.on("open", function () {
            console.log('open');
            
            port.on('data', function (data) {
                console.log(data);
                
                io.sendSerialPortData('01', data);
                
                setTimeout(() => {
                    port.write('hola');
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