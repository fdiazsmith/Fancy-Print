var connectionId = -1;
//this is to move the servo
// Create new generic Event
// MORE @-https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
var newLine = new Event('dataLine');


var dataAssembly = "";
var row_Index = 0;
var colum_Index = 0;

var dataStream =[];
// dataStream.push([10]);
function onReceive(receiveInfo) {
  if (receiveInfo.connectionId !== connectionId)
    return;
  //NOTE: the Serial receives bytes. Data needs to be assembled into strings
  //then split by  \n and ,
  var uint8View = new Uint8Array(receiveInfo.data);
  //Every character or group of characters append them to a running string
  for (var i = 0 ; i < uint8View.length ; i++) {
    dataAssembly += String.fromCharCode(uint8View[i]);
  }
  //Every carriage return get the line and split it.
  if(dataAssembly.match("\n") !== null){
    var lineBreak = dataAssembly.match("\n").index;
    var row = dataAssembly.slice(0,lineBreak);
    var columns = row.split(",");
    dataStream[row_Index] = columns;
    // console.log(dataStream[row_Index]);
    // Dispatch the newLine.
    newLine.data = dataStream[row_Index];
    newLine.error = false;
    document.dispatchEvent(newLine);
    row_Index++;
    //clear the data assembly, to prevent it from getting HUGE!
    dataAssembly = "";
  }
};

function onError(errorInfo) {
  newLine.error = errorInfo;
  document.dispatchEvent(newLine);
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

  // document.getElementById('position-input').onchange = function() {
  //   setPosition(parseInt(this.value, 10));
  // };

  chrome.serial.getDevices(function(ports) {
    buildPortPicker(ports)
    openSelectedPort();
  });
};
