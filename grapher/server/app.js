


if (Meteor.isServer) {
  Meteor.startup(function () {
    // change the path and baudrate to match your setup
    var serialPort = new SerialPort.SerialPort('/dev/tty.usbmodem14241', {
        baudrate: 9600,
        parser: SerialPort.parsers.readline('\r\n')
    });

    serialPort.on('open', function() {
        console.log('Port open');
    });

    // receive data
    serialPort.on('data', gggg);
    function gggg(d){
        console.log(d);
        
        
    }

    // Meteor.methods({
    //     "test": function(d){
    //         console.log("TEST methods ", d);
    //         return "from server "+d;
    //     }
    // });

  });
  // define the websocket connection using the `io` global variable
    var socket = io('localhost:3000/');

    // subscribe to a data feed
    socket.emit('subscribe', 'data-feed-name-goes-here');

    // we can now handle connect, disconnect, and data-driven events
    // NOTE: you must open up a new fiber using Meteor.bindEnvironment
    // in order to perform Mongo read/writes or call Meteor methods
    // within the socket connection

    // on connect
    socket.on('connect', Meteor.bindEnvironment(function() {
      console.log('Connected to the websocket!');
      Meteor.call('methodName1');

      // on data event
      socket.on('data-event', Meteor.bindEnvironment(function(data) {
        console.log(data);
        Meteor.call('methodName2');
      }, function(e) {
        throw e;
      }));

      // on disconnect
      socket.on('disconnect', Meteor.bindEnvironment(function() {
        console.log('Disconnected from the websocket!');
        Meteor.call('methodName3');
      }, function(e) {
        throw e;
      }));

    }, function(e) {
      throw e;
    }));
}
