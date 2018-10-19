var IO = require('socket.io');

var io = undefined;

var socket = undefined;

exports.start = (srv) => {
    io = new IO(srv);

    io.on('connection', (sk) => {
        console.log('user connected');

        sk.emit('hello', 'hello');

        socket = sk;
    });

}

exports.sendSerialPortData = (sensorId, value) => {
    // console.log('emit to socket');
    if (socket == undefined) {
        return;
    } else {
        // console.log(soc  ket);
        socket.emit('data', {
            sensorId: sensorId,
            value: value
        });
    }

    
}