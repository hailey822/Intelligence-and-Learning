 #include <Servo.h>
int servoPinL = 4;
int servoPinR = 3;
Servo servoL;
Servo servoR;

byte lightPinL = A5;
int lightValueL;
int lightMinL = 10;    
int lightMaxL= 150;

byte lightPinR = A6;
int lightValueR;
int lightMinR = 10;    
int lightMaxR= 100;

int motor =2 ;

int humPin = A7;
int humValue = 0;
const int humMin = 10;
const int humMax = 600;

int Max7219_pinCLK = 8;
int Max7219_pinCS = 9;
int Max7219_pinDIN = 10;

unsigned char i;
unsigned char j; 

unsigned char happyFace[1][8]={
{0x3C,0x42,0x95,0xA1,0xA1,0x95,0x42,0x3C}};
unsigned char humidFace[1][8]={
{0x3C,0x42,0xA5,0x91,0x91,0xA5,0x42,0x3C}};

unsigned char drop[8][8]={
{0x00,0x00,0x00,0x01,0x01,0x00,0x00,0x00},
{0x00,0x00,0x01,0x03,0x03,0x01,0x00,0x00},
{0x00,0x00,0x03,0x07,0x07,0x03,0x00,0x00},
{0x00,0x00,0x07,0x0F,0x0F,0x07,0x00,0x00},
{0x00,0x00,0x0F,0x1F,0x1F,0x0E,0x00,0x00},
{0x00,0x00,0x1F,0x3F,0x3E,0x1C,0x00,0x00},
{0x00,0x00,0x3F,0x7E,0x7C,0x38,0x00,0x00},
{0x00,0x00,0x7E,0xFC,0xF8,0x70,0x00,0x00}
};

unsigned char dry[1][8]={
{0x00,0x00,0x7E,0xFC,0xF8,0x70,0x00,0x00}
};

unsigned char touchFace[2][8]={
{0x0C,0x1E,0x3E,0x7C,0x7C,0x3E,0x1E,0x0C},
{0x3C,0x42,0x95,0xA1,0xA1,0x95,0x42,0x3C}
};

void Write_Max7219_byte(unsigned char DATA) {   
  unsigned char i;
  digitalWrite(Max7219_pinCS,LOW);  
  for(i=8;i>=1;i--){
    digitalWrite(Max7219_pinCLK,LOW);
    digitalWrite(Max7219_pinDIN,DATA&0x80);// Extracting a bit data
    DATA = DATA<<1;
    digitalWrite(Max7219_pinCLK,HIGH);
  }                                 
}

void Write_Max7219(unsigned char address,unsigned char dat){
  digitalWrite(Max7219_pinCS,LOW);
  Write_Max7219_byte(address);           //address，code of LED
  Write_Max7219_byte(dat);               //data，figure on LED 
  digitalWrite(Max7219_pinCS,HIGH);
}
 
void Init_MAX7219(void){
  Write_Max7219(0x09, 0x00);       //decoding ：BCD
  Write_Max7219(0x0a, 0x03);       //brightness 
  Write_Max7219(0x0b, 0x07);       //scanlimit；8 LEDs
  Write_Max7219(0x0c, 0x01);       //power-down mode：0，normal mode：1
  Write_Max7219(0x0f, 0x00);       //test display：1；EOT，display：0
}












void setup(){
  Serial.begin(9600);
  
  servoL.attach(servoPinL);
  servoR.attach(servoPinR);
  
  pinMode(motor, OUTPUT);

  //calibrating light value
  /*while (millis() < 3000) {
    lightValue1 = analogRead(lightPin1);
    lightValue2 = analogRead(lightPin2);
    if (lightValue1 > lightMax1) {
      lightMax1 = lightValue1;}
    if (lightValue1 < lightMin1) {
      lightMin1 = lightValue1;}
    if (lightValue2 > lightMax2) {
      lightMax2 = lightValue2;}
    if (lightValue2 < lightMin2) {
      lightMin2 = lightValue2;}
  }
  */
  
  pinMode(Max7219_pinCLK,OUTPUT);
  pinMode(Max7219_pinCS,OUTPUT);
  pinMode(Max7219_pinDIN,OUTPUT);
  Init_MAX7219();
  
}











void loop(){
  lightValueL = analogRead(lightPinL);
  lightValueL = map(lightValueL, lightMinL, lightMaxL, 0, 10);
 
  lightValueR = analogRead(lightPinR);
  lightValueR = map(lightValueR, lightMinR, lightMaxR, 0,10); 
  
  humValue = analogRead(humPin);
  int humRange = map(humValue, humMin, humMax, 0, 2);
  
  switch (humRange) {
  case 0:  
    needW();
    drops();
    Serial.write(3);
    //Serial.println("dry");
    break;
  case 1: 
    //Serial.println("happy");
    Serial.write(2);
    for(j=0;j<1;j++){
      for(i=1;i<9;i++)
      Write_Max7219(i,happyFace[j][i-1]);
    }
    break;
    case 2:
    Serial.write(1);   
    //Serial.println("humid");
    for(j=0;j<1;j++){
      for(i=1;i<9;i++)
      Write_Max7219(i,humidFace[j][i-1]);
    }
    break;
  }
  
  
  
  
  if(lightValueR<2){
    Serial.write(1);
    //Serial.println("RIGHT: YES");
    rightT();
    touch();
    for(j=0;j<2;j++){
      for(i=1;i<9;i++)
      Write_Max7219(i,touchFace[j][i-1]);
      delay(300);
    }
  }
  
  if(lightValueL<2){
   Serial.write(1);
    //Serial.println("LEFT: YES");
    leftT();
    touch();
    for(j=0;j<2;j++){
      for(i=1;i<9;i++)
      Write_Max7219(i,touchFace[j][i-1]);
      delay(300);
    }
  }
 
    
  else{
    Serial.write(2);
    noTouch();
    if(humRange != 0) center();
  }
  
  

  /*
  Serial.print("lightL: ");
  Serial.println(lightValueL);
  Serial.print("lightR: ");
  Serial.println(lightValueR);
  Serial.print("hum: ");
  Serial.println(humValue);
  delay(300);
  */
  

   
  delay(1);

}
















void drops(void){
  for(j=0;j<8;j++){
    for(i=1;i<9;i++)
    Write_Max7219(i,drop[j][i-1]);
    delay(150);
  }
}

  
void leftT(){
  servoL.write(10);
}

void rightT(){
  servoR.write(90);
}

void center(){
  servoL.write(60);
  servoR.write(40);
}

void needW() { 
  servoL.write(10);
  servoR.write(90); 
  delay(200); 
  servoL.write(60);
  servoR.write(40); 
  delay(200); 
}

void touch(void){
  digitalWrite(motor, HIGH);
}

void noTouch(void){
   digitalWrite(motor, LOW);
}
