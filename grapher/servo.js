var connectionId = -1;
//this is to move the servo
function setPosition(position) {
  var buffer = new ArrayBuffer(1);
  var uint8View = new Uint8Array(buffer);
  uint8View[0] = '0'.charCodeAt(0) + position;
  chrome.serial.send(connectionId, buffer, function() {});
};
var fds = "";
function onReceive(receiveInfo) {
  if (receiveInfo.connectionId !== connectionId)
    return;

  // console.dir(receiveInfo);
  var uint8View = new Uint8Array(receiveInfo.data);
  var value = uint8View[uint8View.length - 1] - '0'.charCodeAt(0);
  // var rotation = value * 18.0;
  // while(String.fromCharCode(uint8View[0]) != 44){

  // }
  
  

  for (var i = 0 ; i < uint8View.length ; i++) {
    // uint8View[i] 
  console.log(String.fromCharCode(uint8View[i]), uint8View);
  if(String.fromCharCode(uint8View[i]) == 44){
    console.log(fds);
    console.log(">,<");
    fds =0 ;
  }
  else{
    fds += String.fromCharCode(uint8View[i]);
  }

  }
  console.log("**");
  // document.getElementById('image').style.webkitTransform =
  //   'rotateZ(' + rotation + 'deg)';
};

function onError(errorInfo) {
  console.warn("Receive error on serial connection: " + errorInfo.error);
};

chrome.serial.onReceive.addListener(onReceive);
chrome.serial.onReceiveError.addListener(onError);

function onOpen(connectionInfo) {
  if (!connectionInfo) {
    setStatus('Could not open');
    return;
  }
  connectionId = connectionInfo.connectionId;
  setStatus('Connected');
  setPosition(0);
};

function setStatus(status) {
  document.getElementById('status').innerText = status;
}

function buildPortPicker(ports) {
  var eligiblePorts = ports.filter(function(port) {
    return !port.path.match(/[Bb]luetooth/);
  });

  var portPicker = document.getElementById('port-picker');
  eligiblePorts.forEach(function(port) {
    var portOption = document.createElement('option');
    portOption.value = portOption.innerText = port.path;
    portPicker.appendChild(portOption);
  });

  portPicker.onchange = function() {
    if (connectionId != -1) {
      chrome.serial.disconnect(connectionId, openSelectedPort);
      return;
    }
    openSelectedPort();
  };
}

function openSelectedPort() {
  var portPicker = document.getElementById('port-picker');
  var selectedPort = portPicker.options[portPicker.selectedIndex].value;
  chrome.serial.connect(selectedPort, onOpen);
}

onload = function() {
  var tv = document.getElementById('tv');
  navigator.webkitGetUserMedia(
      {video: true},
      function(stream) {
        console.log("NOT USING THE TV");
        // tv.classList.add('working');
        // document.getElementById('camera-output').src =
        //     webkitURL.createObjectURL(stream);
      },
      function() {
        tv.classList.add('broken');
      });

  document.getElementById('position-input').onchange = function() {
    setPosition(parseInt(this.value, 10));
  };

  chrome.serial.getDevices(function(ports) {
    buildPortPicker(ports)
    openSelectedPort();
  });
};
