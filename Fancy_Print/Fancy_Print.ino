/*********************************************************
Author: fer.
**********************************************************/
#define NAME_ "Fancy Print: graphing"
#define VERSION_ "0.2"
/*********************************************************

**********************************************************/

#include "Fancy_Print.h" //

/**
  * C O M M U N I C A T I O N   P R O T O C O L S
  */
#define   FANCY_SERIAL_DEBUG false               //Prints all the values in a well organized way



// Declare constants that will only be necessary of using fancy serial debug.
#if       FANCY_SERIAL_DEBUG
  Fancy_Print fancy = Fancy_Print();
#else

#endif
/**
 * S E T U P
 */
void setup() {
  while (!Serial);
   // needed to keep leonardo/micro from starting too fast!
  #if FANCY_SERIAL_DEBUG
    if(!fancy.init(9600)){
      Serial.begin(9600);Serial.print("FAILED");
    }
  #else
    Serial.begin(9600);
   Serial.println(NAME_);
   Serial.println(VERSION_);
  #endif
}

void loop(){
  // Serial.print(33333);//random(1, 10));
  // Serial.print(",");
  // Serial.write(33333);//random(1, 10));
  // // Serial.print(2);//random(1, 100));
  // Serial.print(",");
  // Serial.print(1);//random(1, 50));
  Serial.print(random(0,1023));
  Serial.print(",");
  Serial.print(3.14679);
  // Serial.write(random(0, 1023));//random(1, 50));
  // Serial.write(1);
  Serial.println();
  delay(1000);
}
