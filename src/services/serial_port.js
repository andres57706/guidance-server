var SerialPort = require("serialport");
const EventEmitter = require("events");
var io = require("./socket_io");

class SerialPortService extends EventEmitter {

    /**
     * @param {string} port serial port name, ex: COM3
     */
    constructor(port) {
        super();
        this.port = new SerialPort(port, {
            baudrate: 9600,
            parser: serialport.parsers.readline("\n")
        });
        // Read the port data
        port.on("open", function () {
            debug("open port");

            port.on("data", function (data) {
                debug("received data: %s", JSON.stringify(data));

                // sending data througth socket.io to the web browser client
                io.sendSerialPortData("01", data);
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