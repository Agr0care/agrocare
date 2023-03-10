#include <WiFiManager.h>
#include <TFT_eSPI.h>
#include <qrcode_espi.h>
#include <Preferences.h>

Preferences preferences;
TFT_eSPI tft = TFT_eSPI();
QRcode_eSPI qrcode (&tft);
WiFiManager wm;

String ssid = "Agrocare";
String security = "WPA";
String uuid = "";

void setup() {
    preferences.begin("uuid", false);
    
    if (!preferences.isKey("value")) {
      uuid = generateUUID();
      preferences.putString("value", uuid);
    }
    
    uuid = preferences.getString("value", "");
    
    Serial.println("UUID: " + uuid);
    
    preferences.end();
    tft.begin();
    tft.setRotation(3);
    qrcode.init();
    qrcode.create("WIFI:S:"+ssid+";T:"+security+";P:"+uuid+";;");

    Serial.begin(115200);

    bool res;
    const char* pwdstr = uuid.c_str();
    res = wm.autoConnect("Agrocare", pwdstr);
 

    if(!res) {
        tft.fillScreen(TFT_BLACK);
        tft.setRotation(3);
        tft.setTextSize(2);
        tft.print("Falló la conexión. Reiniciando en ");
        for(int i = 0; i != 5; i++) {
           tft.print(String(i + "... "));
           sleep(1);
        }
        ESP.restart();
    } 
    else {
        tft.fillScreen(TFT_BLACK);
        tft.setRotation(3);
        tft.setTextSize(2);
        tft.println("Conectado");
        pinMode(35, INPUT);
    }

  preferences.end();
}

void loop() {
  Serial.println(uuid);
  if(digitalRead(35) == LOW) {
    wm.resetSettings();
  }
}

String generateUUID() {
  String uuid = "";
  for (int i = 0; i < 8; i++) {
    uuid += (char)(random(26) + 'a');
  }
  return uuid;
}
