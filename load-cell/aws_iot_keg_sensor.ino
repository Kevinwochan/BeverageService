
#include <HX711.h>
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include "config.h"
#include "secrets.h"
#include "WiFi.h"


HX711 scale;                     // Initiate HX711 library
WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }

  // Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Create a message handler
  client.onMessage(messageHandler);

  Serial.print("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if(!client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

void publishMessage(String &reading, String &raw)
{
  StaticJsonDocument<200> doc;
  doc["time"] = millis();
  doc["reading"] = reading;
  doc["raw"] = raw;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); // print to client

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void messageHandler(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);

  Serial.println("starting tare...");
  scale.wait_ready();
  scale.set_scale();
  scale.tare(); //Reset scale to zero
  Serial.println("Scale reset to zero");
}

void setup() {
  Serial.begin(9600);
  connectAWS();

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN); // Start scale on specified pins
  scale.wait_ready();                               //Ensure scale is ready, this is a blocking function
  scale.set_scale();
  Serial.println("Scale Set");
  scale.wait_ready();
  scale.tare(); // Tare scale on startup
  scale.wait_ready();
  Serial.println("Scale Zeroed");
}

void loop() {
  float reading;                       // Float for reading
  float raw;                           // Float for raw value which can be useful
  scale.wait_ready();                  // Wait till scale is ready, this is blocking if your hardware is not connected properly.
  scale.set_scale(calibration_factor); // Sets the calibration factor.
  //scale.set_offset(offset_factor);     // Sets the offset factor.

  Serial.print("Reading: "); // Prints weight readings in .2 decimal kg units.
  scale.wait_ready();
  reading = scale.get_units(10); //Read scale in g/Kg
  raw = scale.read_average(5);   //Read raw value from scale too
  Serial.print(reading, 1);
  Serial.println(" L");
  Serial.print("Raw: ");
  Serial.println(raw);
  Serial.print("Calibration factor: "); // Prints calibration factor.
  Serial.println(calibration_factor);

  if (reading < 0)
  {
    reading = 0.00; //Sets reading to 0 if it is a negative value, sometimes loadcells will drift into slightly negative values
  }

  String value_str = String(reading);
  String value_raw_str = String(raw);

  publishMessage(value_str, value_raw_str);
  client.loop();
  scale.power_down(); // Puts the scale to sleep mode for 3 seconds. I had issues getting readings if I did not do this
  delay(3000);
  scale.power_up();
}



