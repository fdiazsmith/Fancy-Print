/*********************************************************
Author: fer.
**********************************************************/
#define NAME "Fancy Print: graphing"
#define VERSION "0.2"
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
   Serial.println(NAME);
   Serial.println(VERSION);
  #endif
}

void loop(){
  Serial.print(random(1, 10));
  Serial.print(",");
  Serial.print(random(1, 100));
  Serial.print(",");
  Serial.print(random(1, 50));
  Serial.println(); 
  delay(1000);
}