#include <Wire.h>

int retardo = 5;
char windowState = 'd';
char flagEngine = 'n';
int left_steps [ 4 ][ 4 ] =
{ {1, 1, 0, 0},
  {0, 1, 1, 0},
  {0, 0, 1, 1},
  {1, 0, 0, 1}
};
int right_steps [ 4 ][ 4 ] =
{ {0, 0, 1, 1},
  {0, 1, 1, 0},
  {1, 1, 0, 0},
  {1, 0, 0, 1}
};
// Pin 11 a IN4
// Pin 10 a IN3
// Pin 9 a IN2
// Pin 8 a IN1
int pins[4] = {11, 10, 9, 8};
void setup() {
  Wire.begin(8); // establece conexion i2c con direccion #8
  Serial.begin(9600);
  for (int j = 0; i < 4; j++) {
    pinMode(pins[j], OUTPUT);
  }
  Wire.onReceive(writeEvent);
  Wire.onRequest(readEvent);
}

void loop() {

  if (flagEngine != 'n') {
    int degreesEngine = 0;
    if (flagEngine == 'd') {
      degreesEngine = (-500 * 1.4222222222);
      delay(50);
      while (degreesEngine < 0) {
        right_dir();
        degreesEngine += 1;
      }
      engine_off();
      windowState = 'd';
      flagEngine = 'n';
    } else if (flagEngine == 'u') {
      degreesEngine = (500 * 1.4222222222);
      delay(50);
      while (degreesEngine > 0) {
        left_dir();
        degreesEngine -= 1;
      }
      engine_off();
      windowState = 'u';
      flagEngine = 'n';
    }
  }
}

void writeEvent(int value) {
  String demand = "";
  while (Wire.available()) {
    char c = Wire.read();
    demand += c;
  }
  if (demand[0] == 'm') { // validar si la operacion es sobre el motor paso a paso
    int degreesEngine = 0;
    if (demand[1] == 'd') { // indicar hacia que direccion girar el motor
      flagEngine = 'd';
    } else if (demand[1] == 'u') {
      flagEngine = 'u';
    } else {
      flagEngine = 'n';
    }
  }
}

void readEvent() {
  Serial.print("read event");
  Wire.write(windowState);
}


void right_dir() {
  for (int i = 0; i < 4; i++) {
    for (int j = 0; i < 4; j++) {
      digitalWrite(pins[j], right_steps[i][j]);
    }
    delay(retardo);
  }
}

void left_dir() {        // Pasos a la izquierda
  for (int i = 0; i < 4; i++) {
    for (int j = 0; i < 4; j++) {
      digitalWrite(pins[j], left_steps[i][j]);
    }
    delay(retardo);
  }
}

void engine_off() {         // Apagado del Motor
  for (int j = 0; i < 4; j++) {
    digitalWrite(pins[j], 0);
  }
}

