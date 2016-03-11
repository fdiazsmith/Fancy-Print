var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/general');

var behaviour_at_home   = require('./routes/behaviour_at_home');

var users = require('./routes/users');

var io = require('socket.io');

var debug = require('debug')('nutrition:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');

var app = express();

/**
  * BOILER PLATE SERVER STUFF
  */


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, io, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

/**
 * Get port from environment and store in Express.
 */
app.set('port', port);
/**
 * Create HTTP server.
 */
server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

var io = require('socket.io')(server);



/*
//   ______  ________   ______   _______  ________        __    __  ________  _______   ________
//  /      \|        \ /      \ |       \|        \      |  \  |  \|        \|       \ |        \
// |  $$$$$$\\$$$$$$$$|  $$$$$$\| $$$$$$$\\$$$$$$$$      | $$  | $$| $$$$$$$$| $$$$$$$\| $$$$$$$$
// | $$___\$$  | $$   | $$__| $$| $$__| $$  | $$         | $$__| $$| $$__    | $$__| $$| $$__
//  \$$    \   | $$   | $$    $$| $$    $$  | $$         | $$    $$| $$  \   | $$    $$| $$  \
//  _\$$$$$$\  | $$   | $$$$$$$$| $$$$$$$\  | $$         | $$$$$$$$| $$$$$   | $$$$$$$\| $$$$$
// |  \__| $$  | $$   | $$  | $$| $$  | $$  | $$         | $$  | $$| $$_____ | $$  | $$| $$_____
//  \$$    $$  | $$   | $$  | $$| $$  | $$  | $$         | $$  | $$| $$     \| $$  | $$| $$     \
//   \$$$$$$    \$$    \$$   \$$ \$$   \$$   \$$          \$$   \$$ \$$$$$$$$ \$$   \$$ \$$$$$$$$
*/

app.use('/', routes);

app.use('/behaviour_at_home', behaviour_at_home);
app.use('/users', users);


///////////////////////////////////////////////////////////////////////////
// var io = require('../socket.io');

// io.listen(server);

io.on('connection', function (socket) {
  console.log("SOCKET\n");

  socket.emit('news', { hello: 'world' });


  socket.on('test', function (data) {
    console.log("app.js SOCKET ",data);
    socket.emit('news', { hello: 'world' });
  });

});





// serialport
var serialport 	= require( "serialport" );
var SerialPort 	= serialport.SerialPort; // local instance

var portNameNumber = 0;
var myPort;
var socketClients = {};
var foundPort = false;


// // Serial Port stuff
var portName = [ '/dev/cu.usbserial-A8008KwD',
                  '/dev/cu.usbserial-A900cfcZ',
								 '/dev/cu.usbserial-A601LRYL',
                 '/dev/cu.usbmodem14511', '/dev/cu.usbmodem1a1311',"/dev/cu.usbmodem14241"
								 ];

var mostLikelyPort = "/\/dev\/cu.usbmodem/g"

serialport.list(function (err, ports) {
// // flag for whether serial is connected
	console.log( "***** AVAILABLE SERIAL PORTS *****");
	// go through each port and
	ports.forEach(function(port) {
		console.log(port.comName);
		for (var i = portName.length - 1; i >= 0; i--) {
      //NOTE: consider using RegExp
      //String.prototype.match.call(port.comName, mostLikelyPort) != null 
			if ( port.comName === portName[i]){
				portNameNumber = i;
				foundPort = true;

			}
		};
  });
  setupSerial();
});

var RIFIDReader = false;

function setupSerial(){
  // this only creates a port if the named one is found. allows for server to work without arduino attached
	if ( foundPort ){
		var myPort = new SerialPort(portName[portNameNumber], {
			// look for return and newline at the end of each data packet:
			parser: serialport.parsers.readline("\r\n"),
			//parser: serialport.parsers.raw,
			baudrate: 9600 //31250 //9600
		});

		myPort.on( 'open', function(){
			console.log( 'Port ' + portName[portNameNumber] + ' has opened.' );
      if(portName[portNameNumber] === '/dev/cu.usbserial-A601LRYL') RIFIDReader = true;

        myPort.on('data', function (data) {
          console.log( 'Received Serial Data : ' + data );
          if(parseInt(data.trim()) === 0)tagRemoved = true;
          else tagRemoved = false;

          // if a socket is connected ( a screen ), send them the data
          if ( io.sockets.sockets.length != 0 ){
            for ( var i=0; i<io.sockets.sockets.length; i++ ){
              // var _id = "_"+data.toString()+"";
              // console.log(speudoDB[_id] );
              if(tagRemoved) io.sockets.sockets[i].emit( 'tagRemoved', {"message": "The tag was removed, would you be so kind as to clear the screen?" } );
              else io.sockets.sockets[i].emit( 'tag', data.toString() );
            }
          }
        });

		});
	}
	else {
		console.log( "*******************************************************************************************************" );
		console.log( "No Matching Serial port was found. Server will continue, but withouth serial connection." );
		console.log( "If you need an Arduino to work, check the console above and replace portName with the correct port." );
		console.log( "*******************************************************************************************************" );
		console.log();
	}

}

function ioTest(){
  console.log("TESTING ROUTING FROM IO");
};





var speudoDB = {
  "_010231674217" : {
    id : "Cardboard_Box",
    title : "Cardboard Box",
    body : "blah blah blah",
  }
}








module.exports = app;
