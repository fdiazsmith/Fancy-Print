/**
 * D E B U G G I N G   F U N C I T I O N S
 * - http://forum.arduino.cc/index.php?topic=6274.0
 */
// there is three declarations of the same function so that it can take different data types

#include "Fancy_Print.h"

Fancy_Print::Fancy_Print(){
}

boolean Fancy_Print::init(uint8_t _baudRate){
  Serial.begin(115200);
  Serial.println("ASDFASDFS");
  Serial.print("\e[2J");   //routine clear
  Serial.print("\eSP F");  // tell to use 7-bit control codes
  Serial.print("\e[?25l"); // hide cursor
  Serial.print("\e[?12l"); // disable cursor highlighting
  delay(20);
  setupColsAndRowFancyPrint();

  return true;
}


void Fancy_Print::print(int _msg, int _index, int _colum, String _color){
  String _direction = findColAndRow(_index, _colum, _color); //assemble the executable code.
  Serial.print(_direction);//print it
  Serial.print("     ");   //clear the space
  Serial.print(_direction);//backtrack
  Serial.print(_msg);      //print the actual msg
}
void Fancy_Print::print(uint16_t _msg, int _index, int _colum, String _color){
  String _direction = findColAndRow(_index, _colum, _color); //assemble the executable code.
  Serial.print(_direction);//print it
  Serial.print("     ");   //clear the space
  Serial.print(_direction);//backtrack
  Serial.print(_msg);      //print the actual msg
}
void Fancy_Print::print(long _msg, int _index, int _colum, String _color){
  String _direction = findColAndRow(_index, _colum, _color); //assemble the executable code.
  Serial.print(_direction);//print it
  Serial.print("     ");   //clear the space
  Serial.print(_direction);//backtrack
  Serial.print(_msg);      //print the actual msg
}
void Fancy_Print::print(float _msg, int _index, int _colum, String _color){
  String _direction = findColAndRow(_index, _colum, _color); //assemble the executable code.
  Serial.print(_direction);//print it
  Serial.print("     ");   //clear the space
  Serial.print(_direction);//backtrack
  Serial.print(_msg);      //print the actual msg
}
void Fancy_Print::print(String _msg, int _index, int _colum, String _color){
  String _direction = findColAndRow(_index, _colum, _color); //assemble the executable code.
  Serial.print(_direction);//print it
  Serial.print("     ");   //clear the space
  Serial.print(_direction);//backtrack
  Serial.print(_msg);      //print the actual msg
}

String Fancy_Print::findColAndRow( int _index, int _colum, String _color){
  String _direction ="";
  String _x = "";
  String _y = "\e[";
  String _col = "\e[36m";
   switch(_index){
     case 0: _y = _y+"2;";
       break;
     case 1: _y = _y+"4;";
       break;
     case 2: _y = _y+"5;";
       break;
     case 3: _y = _y+"6;";
       break;
     case 4: _y = _y+"7;";
       break;
     case 5: _y = _y+"10;";
       break;
     case 6: _y = _y+"11;";
       break;
     case 7: _y = _y+"12;";
       break;
     case 8: _y = _y+"13;";
       break;
     case 9: _y = _y+"14;";
       break;
     default:_y = _y+_index+";";
       break;
   }
   switch(_colum){
     case 0: _x = _x+"0H";
       break;
     case 1: _x = _x+"132H";
       break;
     case 2: _x = _x+"121H";
       break;
     case 3: _x = _x+"110H";
       break;
     case 4: _x = _x+"99H";
       break;
     case 5: _x = _x+"88H";
       break;
     case 6: _x = _x+"77H";
       break;
     case 7: _x = _x+"66H";
       break;
     case 8: _x = _x+"55H";
       break;
     case 9: _x = _x+"44H";
       break;
     case 10: _x = _x+"33H";
       break;
     case 11: _x = _x+"22H";
       break;
     case 12: _x = _x+"11H";
       break;
     case 13: _x = _x+"143H";
       break;
     case 14: _x = _x+"154H";
       break;
     default:_x = _x+_colum+"H";
       break;
   }
   if(_color == "red"){
     _col = "\e[31m";
   }
   return _direction = _y+_x+_col; //assemble the executable code.
}
/* Sets up fancy print tables and rows
 *********************************/

void Fancy_Print::setupColsAndRowFancyPrint(){
  Serial.print("\e[2J");    //routine clear
  Serial.print("\eSP F");  // tell to use 7-bit control codes
  Serial.print("\e[?25l"); // hide cursor
  Serial.print("\e[?12l"); // disable cursor highlighting
    
  Serial.print("\e[1;1H");
  Serial.print(NAME);
  Serial.print(VERSION);
  Serial.print("\e[3;11HElec 12");
  Serial.print("\e[3;22HElec 11");
  Serial.print("\e[3;33HElec 10");
  Serial.print("\e[3;44HElec 9");
  Serial.print("\e[3;55HElec 8");
  Serial.print("\e[3;66HElec 7");
  Serial.print("\e[3;77HElec 6");
  Serial.print("\e[3;88HElec 5");
  Serial.print("\e[3;99HElec 4");
  Serial.print("\e[3;110HEleX 3");
  Serial.print("\e[3;121HEleX 2");
  Serial.print("\e[3;132HElec 1");
  Serial.print("\e[3;154HDecimal Representation");

  Serial.print("\e[9;11HCurrent");
  Serial.print("\e[9;22HLast");
  Serial.print("\e[9;33HDiff");
  Serial.print("\e[9;44HDir");
  Serial.print("\e[9;55HVal");
  Serial.print("\e[9;66HAbsolutePos");

  Serial.print("\e[9;77HFLAGS");
  Serial.print("\e[9;88HTouched");
  Serial.print("\e[9;99HMulty");
  Serial.print("\e[9;110HSingle");
  Serial.print("\e[9;121HCenter");


  Serial.print("\e[4;1HBinary:");    
  Serial.print("\e[5;1HFiltered:");
    //setup fancy serial
  Serial.print("\e[6;0HBase:");
  Serial.print("\e[7;0H^ Smooth:");

  Serial.print("\e[10;1HLSB set:");    
  Serial.print("\e[11;1HMSB set:");
  Serial.print("\e[12;1HCenter");
  Serial.print("\e[13;1HOut put:");
}
/* DESIGN OF THE FANCY SERIAL PRINTOUT

1  | MUSE - hand dial MPR121 Capacitive Touch sensor: Sparkfun code 0.2.5
2  |
3  |         Elc 12     Elc 11     Elc 10     Elc 9      Elc 8      Elc 7      Elc 6      Elc 5      Elc 4      Elc 3      Elc 2      Elc 1
4  |Binary:   0          0          0          0          0          0          0          0          0          0          0          0                     64
5  |Filtered: 162        145        153        154        147        148        151        149        152        153        143        149
6  |Base:     160        144        152        152        144        148        148        148        152        152        140        148
7  |^ Smooth: 160        144        152        152        144        148        148        148        152        152        140        148
8  |
9  |         Current    Last       Diff       Dir        Val        AbsolutePos FLAGS     Touched    Multy      Single 
10 |d_LSB:      7          6          1          >>
11 |d_MSB:      3          3          0          -
12 |Center   234                                
13 |Output:                                    >>         34         4


*/

