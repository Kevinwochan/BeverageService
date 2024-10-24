
// MQTT Settings
#define AWS_IOT_PUBLISH_TOPIC "BeerSensor/Cafeteria/1"
#define AWS_IOT_SUBSCRIBE_TOPIC "BeerSensor/Cafeteria/1/tare"

// HX711 Pins
const int LOADCELL_DOUT_PIN = 2;  // Remember these are ESP GPIO pins, they are not the physical pins on the board.
const int LOADCELL_SCK_PIN = 0;
int calibration_factor = -22500;  // Defines calibration factor we'll use for calibrating.
int offset_factor = -137202;       // Defines offset factor if you have static weight on the loadcell. For exaple the wight of a empty Cornelius keg. 
