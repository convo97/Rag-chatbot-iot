#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

// ====== WiFi credentials ======
const char* ssid     = "COE_FLEX_2";
const char* password = "coeflex@123";

// ====== Your API endpoint ======
const char* serverName = "https://your-railway-api-url.com/data";  // <-- replace with your API URL

// ====== Soil moisture pin ======
#define SOIL_MOISTURE_PIN 34

// ====== DHT11 config ======
#define DHTPIN 4         // GPIO where DHT11 is connected
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);

  // Start DHT sensor
  dht.begin();

  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\n✅ Connected to WiFi");
}

void loop() {
  // ====== Read Soil Moisture ======
  int soilValue = analogRead(SOIL_MOISTURE_PIN);
  double soilPercent = map(soilValue, 0, 4095, 100, 0);

  // ====== Read DHT11 ======
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Handle possible errors
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("⚠ Failed to read from DHT11 sensor!");
    temperature = 0.0;
    humidity = 0.0;
  }

  // ====== Print Sensor Readings ======
  Serial.println("====== Sensor Readings ======");
  Serial.printf("Soil Moisture: %d (%.2f%%)\n", soilValue, soilPercent);
  Serial.printf("Temperature: %.2f °C\n", temperature);
  Serial.printf("Humidity: %.2f %%\n", humidity);

  // ====== Send Data to API ======
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);  
    http.addHeader("Content-Type", "application/json");

    // JSON Payload
    String jsonPayload = "{";
    jsonPayload += "\"info\":\"ESP32 Soil + DHT11\",";
    jsonPayload += "\"voltage\":" + String(0.0, 2) + ",";
    jsonPayload += "\"current\":" + String(0.0, 2) + ",";
    jsonPayload += "\"humidity\":" + String(humidity, 2) + ",";
    jsonPayload += "\"temperature\":" + String(temperature, 2) + ",";
    jsonPayload += "\"moisture\":" + String(soilPercent, 2) + ",";
    jsonPayload += "\"phValue\":" + String(0.0, 2);
    jsonPayload += "}";

    Serial.println("📤 Sending JSON: " + jsonPayload);

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("✅ Data sent successfully");
      Serial.println("Response: " + response);
    } else {
      Serial.print("❌ Error sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("⚠ WiFi Disconnected");
  }

  delay(10000); // Send data every 10 seconds
}
