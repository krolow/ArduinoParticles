const unsigned LED = 13;
const unsigned PIN = 2;
const unsigned int PORT = 9600;

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(PIN, INPUT);
  Serial.begin(PORT);
}

void loop() {
  if (digitalRead(PIN) == 0) {
    Serial.print(0);
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
  delay(10);
}
