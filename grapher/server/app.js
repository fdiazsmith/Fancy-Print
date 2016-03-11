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
    serialPort.on('data', function(data) {
        console.log('DATA: ' + data);
        Session.set('counter', Session.get('counter') + 1);
    });
    // code to run on server at startup
  });
}
