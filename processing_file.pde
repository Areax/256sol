/* TextFile Sender: Written by Scott C on 5th April 2013
 using Processing Version 2.0b8 */

import processing.serial.*;

Serial comPort;
int counter=0; // Helps to keep track of values sent.
int numItems=0; //Keep track of the number of values in text file
boolean sendStrings=false; //Turns sending on and off
StringLoader sLoader; //Used to send values to Arduino
boolean toggle = false;


void setup(){
  //check serial ports
 comPort = new Serial(this, Serial.list()[1], 9600);
 background(255,0,0); //Start with a Red background
 noLoop();
}

void draw(){
 background(0,255,0); //Change the background to green

 /*When the background is green, transmit
 text file values to the Arduino */
 sLoader=new StringLoader();
 sLoader.start();
}


void mousePressed() {
 //Toggle between sending values and not sending values
 sendStrings= true;
loop();
 //If sendStrings is True - then send values to Arduino
 
}



/*============================================================*/
/* The StringLoader class imports data from a text file
 on a new Thread and sends each value once every half second */
public class StringLoader extends Thread{
 
 public StringLoader(){
 //default constructor
 }
 
 public void run() {
   String textFileLines[]=loadStrings("C:\\Users\\Kiote\\Documents\\HackMS256sol\\LEDchange.txt");
   System.out.println("just keep trying, really.." + counter);
   if(textFileLines.length > 0)
   {
   int x = Integer.parseInt(textFileLines[0]);
   String lineItems[][] = new String[x][];
   byte[] byte_format = new byte[11];
   for(int i = counter; i < x;i++)
   {
     lineItems[i] = new String[3];
     lineItems[i] = splitTokens(textFileLines[i+1], " ");
     //System.out.println("try this: " + lineItems[i][0] + " " + lineItems[i][1] + " " + lineItems[i][2]);
     byte_format = textFileLines[i+1].getBytes();
      comPort.write(byte_format);
      delay(500);
      comPort.write("-1");
   }
   counter = x;
 }
 }
}