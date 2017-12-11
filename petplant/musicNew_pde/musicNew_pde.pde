import processing.serial.*;
Serial myPort;


import ddf.minim.*;
Minim minim;

AudioPlayer playerA;
AudioPlayer playerB;


int val;


void setup()
{
  size(200, 200);
  //background(0);
  
  myPort = new Serial(this, Serial.list()[0], 9600);
  
  minim = new Minim(this);
  playerA = minim.loadFile("I Love Daddy.mp3");
  playerB = minim.loadFile("Can I Have Some Water Please.mp3");
  
}

void draw()
{
  
background(0);

  while(myPort.available()>0){ // difference bet while and if
   println(val); 
    val = myPort.read();
    
    if (val==1){
    playerB.pause();
    playerA.play();
    playerA.loop();
    delay(1500);
    }
    
    else if(val==2) {
    playerB.pause();
    playerA.pause();
   }
   
   else if(val==3) {
     playerB.play();
     playerB.loop();
     delay(1800);
   }

  }
}
