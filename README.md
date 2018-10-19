# Guidance Server

## Quick Start

- Clone the repo
- run in the repository directory

```
$ cd src/

$ npm install
```

to pull all the dependencies

- To run the program run the command

```
$ npm start
```

- For debuggind on default port () or development run the server with nodemon

```
$ npm run debug
```

The server will start listening on localhost:3000

- Open the browser and go to http://localhost:3000/status
- Open the browser debugger console

  The express server with socket.io first emit an event called '**hello**' (No quotes), then it will emit an event called '**data**' (No quotes) every time that he receives data from serial port.

The server it's already receiving data from the **serial_port_test** module this is only for developing purposes. You must adapt the **serial_port** module (file path location: /src/services/serial_port.js) in order to receive data from you serial port

To use the **serial_port** module yout have to change the module used in www file (located in ./src/bin/www)
