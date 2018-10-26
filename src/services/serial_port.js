var SerialPort = require("serialport");
const EventEmitter = require("events");
var io = require("./socket_io");
var debug = require('debug')('serial_port');

class SerialPortService extends EventEmitter {

    /**
     * @param {string} port serial port name, ex: COM3
     */
    constructor(port) {
        super();
        var port = new SerialPort(port, {
            baudRate: 9600
            // parser: serialport.parsers.readline("\n")
        });
        // Read the port data
        port.on("open", function () {
            debug("open port");

            port.on("data", function (data) {
                debug('received data: sensorId: %s, status: %s', data[0], data[1]);

                if (!Buffer.isBuffer(data)) {
                    debug('data parsed is not a buffer');
                    return;
                }
                // sending data througth socket.io to the web browser client
                io.sendSerialPortData(data[0], (data[1] == 1) ? 'occupied' : 'free');
            });
        });

        // Open errors will be emitted as an error event
        port.on("error", function (err) {
            console.log("Error: ", err.message);
            this.emit("error", err.message);
        });
    }
}

module.exports = SerialPortService;