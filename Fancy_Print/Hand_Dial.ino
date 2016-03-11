/*********************************************************
By Tellart LLC. Author: fer.
-this branch tries to address the skipping of pads. It prevents the value from jumping too much.
-adding better time flag
**********************************************************/
#define NAME "MUSE - hand dial MPR121 Capacitive Touch sensor: 13thelectrode"
#define VERSION "0.4.4"
/*********************************************************
This depends on these libraries:

- 1) Adafruit Library for the MPR121 12-channel Capacitive touch sensor
     ----> https://github.com/adafruit/Adafruit_MPR121_Library
- 2) Paul Badger CapitiveSense Library Demo Sketch
     ----> http://playground.arduino.cc/Main/CapacitiveSensor?from=Main.CapSense
- 3) QueueArray Library For Arduino
     ----> http://playground.arduino.cc/Code/QueueArray

And depending on what type of communication protocol you are using it might also use:
- a) The Ethernet UDP Arduino library: SPI, Ethernet, EthernetUdp
     ----> https://www.arduino.cc/en/Tutorial/UDPSendReceiveString

**********************************************************/

#include <Wire.h>            // to Comunicate via I2C
#include "Adafruit_MPR121_Peter_Jansen.h" // To communicate to MPR121
#include <CapacitiveSensor.h>// use Paul Badgers code for the center touch
#include <QueueArray.h>     // to manage the skipping values
#include "Fancy_Print.h" //

/**
  * C O M M U N I C A T I O N   P R O T O C O L S
  */
#define   FANCY_SERIAL_DEBUG false               //Prints all the values in a well organized way
#define   UDP_COMMUNICATION false               //Deploy mode
#define   UDP_COMMUNICATION_W_SERIAL_DEGUB false //Deploy mode plus printout to the terminal
#define   REG_DEBUG false                       //Prints to terminal, with extra info
/**˚
  * U S E R   D E F I N E D   P A R A M E T E R S
  */
#define CTR_BTN_THRESHOLD 200
#define BASE_AVR_NUM_READINGS 100
#define MAX_VAL 24
#define NUMBER_OF_PADS 12
/**
  * G L O B A L S
  */

Adafruit_MPR121_Peter_Jansen cap = Adafruit_MPR121_Peter_Jansen();
Adafruit_MPR121_Peter_Jansen centerProx = Adafruit_MPR121_Peter_Jansen();
CapacitiveSensor   cs_5_8 = CapacitiveSensor(5,8);        // 10M resistor between pins 4 & 8, pin 8 is sensor pin, add a wire and or foil if desired
// Arrays to hold parameters of each pad
QueueArray <int> buffer_skipped_pads;

uint16_t currentReading;

int posValue
  , lastPosValue
  , diffPosValue
  ;
  int reportToMax;

int posAbsolute =0;

int clickVal = 0;

int16_t angleWheel
      , deltaWheel
      ;
bool center_endTouch = false;

/** Time variables to keep track of states and "debounce"
    BASIC STRUCTYURE: if( millis() - tSince_* >= interval_* ){ tSince_* = millis();}
  */
unsigned long tSince_MultyDigit
            , tSince_Touched
            , tSince_SingleDigit
            , tSince_CenterBtn
            ;
unsigned long interval_MultyDigit = 350 //if in multyDigit mode ig does into singleDigit for less than 180mill counted as a bleep
            , interval_Touched = 200 // if 300 have passed since anything was last touched. flip flag.
            , interval_SingleDigit
            , interval_CenterBtn
            ;

bool center_touchedFlag = false;
long center_touchTime = 0; // touch time
int  center_debounceTimeout = 50; // debounce timeout

long center_baseline= 300;
long center_lastBaseline = 300;
long center_TimeStamp = 0;

const int numReadings = 10;

long center_readings[numReadings];      // the center_readings from the analog input
long center_readIndex = 0;              // the index of the current reading
long center_total = 0;                  // the running center_total
long center = 0;


char currentScene = 't';
// Declare constants that will only be necessary of using fancy serial debug.
#if       FANCY_SERIAL_DEBUG
  Fancy_Print fancy = Fancy_Print();

#elif UDP_COMMUNICATION || UDP_COMMUNICATION_W_SERIAL_DEGUB
  #include <SPI.h>
  #include <Ethernet.h>
  #include <EthernetUdp.h>
  #include <OSCMessage.h>

  EthernetUDP Udp;

  // arduino local ip address
  IPAddress ip(192, 168, 1, 4) ;

  // destination ip address
  IPAddress outIp(192, 168, 1, 10) ;
  const unsigned int outPort = 7480;
  const unsigned int localPort = 7400;

  // arduino's mac address.
  // note: you can find this written on the board of some Arduino Ethernets or shields
  byte mac[] = { 0x90, 0xA2, 0xDA, 0x10, 0x24, 0x5A };

  long lastInterval  = 0;
  int  intervalDelay = 500;

  int16_t outMsg = 0;

#endif
/**
 * S E T U P
 */
void setup() {
  while (!Serial);
   // needed to keep leonardo/micro from starting too fast!
  #if FANCY_SERIAL_DEBUG
    if(!fancy.init(115200)){
      Serial.begin(115200);Serial.print("FAILED");
    }
  #elif UDP_COMMUNICATION
    Serial.begin(115200);
    Serial.println(NAME);
    Serial.println(VERSION);
    Ethernet.begin(mac,ip);
    Udp.begin(localPort);
    lastInterval = millis();
  #else
    Serial.begin(115200);
   Serial.println(NAME);
   Serial.println(VERSION);
  #endif
  //check if we can set the printer as UDP protocol.
  buffer_skipped_pads.setPrinter(Serial);

  // Default address is 0x5A, if tied to 3.3V its 0x5B
  // If tied to SDA its 0x5C and if SCL then 0x5D
  if (!cap.begin(0x5A)) {
    #if FANCY_SERIAL_DEBUG
      // fancy.print("MPR121 not found, check wiring?, or maybe you are using CapSense");
    #elif REG_DEBUG
      Serial.println("MPR121 for wheel not found, check wiring?");
    #endif
    while (1);
  }
  else if(!centerProx.begin(0x5B, true)){//connect ADDR to 3v
   #if FANCY_SERIAL_DEBUG
      // fancy.print("MPR121 not found, check wiring?, or maybe you are using CapSense");
    #elif REG_DEBUG
      Serial.println("MPR121 for center prox not found, check wiring?");
    #endif
    while (1);
  }
  else{
    #if FANCY_SERIAL_DEBUG
      // Serial.println("MPR121 found! Starting");
    #elif REG_DEBUG
      Serial.println(NAME);
      Serial.println(VERSION);
    #endif
  }
  delay(110); // chill
  cap.setThresholds(200,250);
  cap.initTouchWheel(12, -30);
  cap.takeWheelBaseline();
  centerProx.enableProxSensor();
  centerProx.proxSetThresholds(180,20); //The touch threshold is several counts larger than the release threshold
  cs_5_8.set_CS_AutocaL_Millis(0xFFFFFF);

}

/**
 * M A I N   L O O P
 */
 int prox_consecutiveTimes = 0;
void loop() {


  angleWheel = cap.getWheelAngle();
  deltaWheel = cap.getWheelIncrement(angleWheel);

  Serial.print(centerProx.proxSensorFiltereData());
  Serial.print("\t");
  Serial.print(centerProx.proxSensorBaselineData());
  Serial.print("\t");
  Serial.print((uint16_t)centerProx.touched(), BIN);
  Serial.println();
  if(centerProx.touched()){
    prox_consecutiveTimes++;
  }else{
      prox_consecutiveTimes=0;
  }
  if(prox_consecutiveTimes >2)Serial.println("tap");
// CSread();
  if(currentScene == 's') {
    // readCenterBtn();
  } else if(deltaWheel != 0 && currentScene == 't') {
    updatePos(deltaWheel);
  }


}



/**
  * H E L P E R   F U N C T I O N S
  *
  *
  *
  *
  *
  *
  *
  *
  */

/**
  * Simple function to update the value of the position and clamp it
  */
  // bool serialFlag = 0;


void serialEvent() {
    while (Serial.available()) {
      int mode = (int)Serial.read();

      if(mode == 0) {
        currentScene = 's';
      } else if(mode == 1) {
        currentScene = 't';
      }
      cap.takeWheelBaseline();
    }
}


void updatePos(int _increment){
  posValue +=_increment;
  posValue = constrain(posValue, 0, 360);
  // diffPosValue = abs(posValue - lastPosValue );
  reportToMax = (24 * posValue)/360;
  posAbsolute = constrain(((12* angleWheel)/360)+1, 0, 12);

  // Serial.println(reportToMax);
  // for(int b=0; b <= diffPosValue; b++){
  //   if(posValue > lastPosValue )
  //     buffer_skipped_pads.enqueue(lastPosValue + b);
  //   else
  //     buffer_skipped_pads.enqueue(lastPosValue - b);
  // }

  // while(!buffer_skipped_pads.isEmpty()){
  //   //use buffer_skipped_pads.count() to create a easing fn depending on the number of buffer left.
  //   tempPosVal = buffer_skipped_pads.dequeue();
    #if FANCY_SERIAL_DEBUG
      fancy.print(reportToMax, d_OUTPUT, d_SCROLL_VAL, "");
    #elif REG_DEBUG
      Serial.print((String)" "+reportToMax);
    #elif UDP_COMMUNICATION
      sendUdp(reportToMax);
    #else
      plainAndSimpleSerial(reportToMax);
    #endif
  // }
  lastPosValue = posValue;
}


boolean center_fluke = false;

/**
  * C E N T E R   B U T T O N
  */

#define debugForGraphin true
#define debugNormal false
int cosecutiveTaps = 0;


void readCenterBtn(){
  center_total = center_total - center_readings[center_readIndex];
  center_readings[center_readIndex] = cs_5_8.capacitiveSensor(7);
  center_total = center_total + center_readings[center_readIndex];
  center_readIndex = center_readIndex + 1;
  if (center_readIndex >= numReadings) {
    center_readIndex = 0;
  }
  center = center_total / numReadings;

  //R E S E T   B A S E L I N E   E V E R Y   5 0 0 m s
  if(millis() - center_TimeStamp > 300 && !center_touchedFlag){
    // Serial.println("take baseline");
    center_lastBaseline = center_baseline;
    center_baseline = center;
    center_TimeStamp = millis();
    // cs_5_8.reset_CS_AutoCal();
  }

  #if FANCY_SERIAL_DEBUG
    fancy.print(center, d_CENTER, d_CURRENT,"");
  #elif debugForGraphin
    Serial.print(center_readings[center_readIndex]);Serial.print(",");
    Serial.print(center);Serial.print(",");
    Serial.print(center_baseline);Serial.print(",");
    Serial.print(clickVal);Serial.print(",");
  #endif


  if(center_readings[center_readIndex] > center_baseline + 18 ){
    clickVal = 100;
    cosecutiveTaps++;
  }
  else{
    cosecutiveTaps = 0;
    clickVal = 0;
  }

  if(cosecutiveTaps > 9 || ( angleWheel != -1 ) ){
      // clickVal = 1;

      #if FANCY_SERIAL_DEBUG
        fancy.print("CLICK", d_CENTER, d_ABSOLUTE,"green");
      #elif REG_DEBUG
        Serial.print(" click ");
      #elif UDP_COMMUNICATION
        sendUdp(1);
      #elif debugForGraphin
        Serial.print("click");
      #else
         plainAndSimpleSerial( posValue);
      #endif
  }
  else{
    clickVal = 0;
  }
  #if debugForGraphin || debugNormal
    Serial.println();
  #endif
}


unsigned long csSum;
void CSread() {
  long cs = cs_5_8.capacitiveSensor(80); //a: Sensor resolution is set to 80
    if (cs > 200) { //b: Arbitrary number
      csSum += cs;
      Serial.println(cs);
      if (csSum >= 3800) //c: This value is the threshold, a High value means it takes longer to trigger
      {
        Serial.print("Trigger: ");
        Serial.println(csSum);
        if (csSum > 0) { csSum = 0; } //Reset
        cs_5_8.reset_CS_AutoCal(); //Stops readings
      }
    } else {
      csSum = 0; //Timeout caused by bad readings
    }
}
/**
  * U D P   C O M M U N I C A T I O N
  */
#if UDP_COMMUNICATION
  void sendUdp(int _msg){
    //message requires an OSC address as first argument
    OSCMessage msg("/hand_sensor/");
    msg.add(reportToMax);    // 0 - 24
    msg.add(posAbsolute); // 0 - 12
    msg.add(clickVal);    // 0 or 1

    Udp.beginPacket(outIp, outPort);
    msg.send(Udp);    // send the bytes to the SLIP stream
    Udp.endPacket(); // mark the end of the OSC Packet
    msg.empty();    // free space occupied by message;
    #if UDP_COMMUNICATION_W_SERIAL_DEGUB
      plainAndSimpleSerial(reportToMax);
    #endif
    delay(10);
  }
#endif
/**
  * N O R M A L
  * if none of the debugging flags are turned on, it uses this.
  */
#if !UDP_COMMUNICATION && !FANCY_SERIAL_DEBUG && !REG_DEBUG || UDP_COMMUNICATION_W_SERIAL_DEGUB
  void plainAndSimpleSerial(int _posValue){
    Serial.println(_posValue);
    Serial.println(posAbsolute);
    Serial.println(clickVal);
    Serial.println(".");
    // Serial.println(0);
    // Serial.println(".");
  }
#endif
