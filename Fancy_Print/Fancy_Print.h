/*
Extract all the fancy print stuff into a Library 
this is so other libraries can use it easier.

*/

#if (ARDUINO >= 100)
 #include "Arduino.h"
#else
 #include "WProgram.h"
#endif

#define BAUD_RATE 115200
#define d_CURRENT 12
#define d_LAST 11
#define d_DIFF 10
#define d_DIR 9
#define d_SCROLL_VAL 8
#define d_ABSOLUTE 7
#define d_OUTPUT 8
#define d_CENTER 7
#define d_MSB 6
#define d_LSB 5

#define NAME "Fancy Print" 
#define VERSION "0.1"


class Fancy_Print {
	public:
	// constexpr
	 Fancy_Print(void);

		boolean init(uint8_t _baudRate = BAUD_RATE);

		void print(int _msg, int _index, int _colum, String _color);
		void print(uint16_t _msg, int _index, int _colum, String _color);
		void print(long _msg, int _index, int _colum, String _color);
		void print(float _msg, int _index, int _colum, String _color);
		void print(String _msg, int _index, int _colum, String _color);

		String findColAndRow( int _index, int _colum, String _color);


	private:
		void setupColsAndRowFancyPrint(void);
};