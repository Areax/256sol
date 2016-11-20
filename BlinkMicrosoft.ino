#include "FastLED.h"
#include <stdio.h>

int mySwitch = 0;
int counter = 0;
int MAX = 100;
int light;
int color;
//need to fix
String subtext [100];

// How many leds in your strip?
#define NUM_LEDS 50

// For led chips like Neopixels, which have a data line, ground, and power, you just
// need to define DATA_PIN.  For led chipsets that are SPI based (four wires - data, clock,
// ground, and power), like the LPD8806 define both DATA_PIN and CLOCK_PIN
#define DATA_PIN 17
#define CLOCK_PIN 13

CRGB leds[NUM_LEDS];

/* Sets up the LED lights */
void setup() { 
      // Uncomment/edit one of the following lines for your leds arrangement.
      // FastLED.addLeds<TM1803, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<TM1804, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<TM1809, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<WS2811, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<WS2812, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<WS2812B, DATA_PIN, RGB>(leds, NUM_LEDS);
  	  FastLED.addLeds<WS2812B, DATA_PIN>(leds, NUM_LEDS);
      // FastLED.addLeds<APA104, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<UCS1903, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<UCS1903B, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<GW6205, DATA_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<GW6205_400, DATA_PIN, RGB>(leds, NUM_LEDS);
      
      // FastLED.addLeds<WS2801, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<SM16716, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<LPD8806, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<P9813, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<APA102, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<DOTSTAR, RGB>(leds, NUM_LEDS);

      // FastLED.addLeds<WS2801, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<SM16716, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<LPD8806, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<P9813, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);
      // FastLED.addLeds<APA102, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);
      //FastLED.addLeds<DOTSTAR, DATA_PIN, CLOCK_PIN, RGB>(leds, NUM_LEDS);

      Serial.begin(9600);
}


void loop() {

leds[10] = CRGB::Yellow;
FastLED.show();

   if(Serial.available())
   {
    leds[19] = CRGB::Yellow;
    FastLED.show();
    int avail_bytes = Serial.available();
    byte all_bytes[avail_bytes];
    int pin_num = -1;
    char* hex_color = '\0';
    // 0 == off, 1 == stay, 2 == blink
    int type = -1;
    
    for(int i = 0; i < avail_bytes; i++)
    {
      all_bytes[i] = Serial.read();
      if(all_bytes[i] == -1)
        pin_num = -1;
        leds[i] = CRGB::Red;
    }

    if(avail_bytes == 11)
    {
      pin_num = all_bytes[0]- '0';
      for(int i = 0; i < 7; i++)
      {
        hex_color[i] = all_bytes[i+3];
      }
      type = all_bytes[10];
    }
    else if(avail_bytes == 12)
    {
      pin_num =(all_bytes[0] - '0') * 10 + (all_bytes[1] - '0');
      for(int i = 0; i < 7; i++)
      {
        hex_color[i] = all_bytes[i+4];
      }
      type = all_bytes[11];
    }

    //hex to integer values
    char red[] = {hex_color[0], hex_color[1]};
    char green[] = {hex_color[2], hex_color[3]};
    char blue[] = {hex_color[4], hex_color[5]};

    int redC = (int) strtol(red, NULL, 16);
    int greenC = (int) strtol(green, NULL, 16);
    int blueC = (int) strtol(blue, NULL, 16);
    
    

    if(pin_num >= 0 && pin_num < 50)
    {
      leds[pin_num] = CRGB(15, 19, 200);
      if(type == 0)
        {
          delay(500);
          //leds[pin_num] = CRGB(0, 0, 0);
        }
    }
      
    //leds[avail_bytes] = CRGB::Purple;

      
    /*pin_num = pin_num - '0';
    //if(pin_num == -1) break;

    //this works!
    //pin_num = pin_num << 1;
    
    if(pin_num >= 0 && pin_num < 50)
    {

         if(pin_num == 0) for(int i = 1; i <= 10; i++) { leds[i] = CRGB:: Black; };
         if(pin_num == 1) leds[pin_num] = CRGB::Blue;
         if(pin_num == 2) leds[pin_num] = CRGB::Green;
         if(pin_num == 3) leds[pin_num] = CRGB::Red;
         if(pin_num == 4) leds[pin_num] = CRGB::Orange;
         if(pin_num == 5) leds[pin_num] = CRGB::Purple;
         if(pin_num == 6) leds[pin_num] = CRGB::White;
         if(pin_num == 7) leds[pin_num] = CRGB::Yellow;
         if(pin_num == 8) leds[pin_num] = CRGB::Brown;
         if(pin_num == 9) leds[pin_num] = CRGB::Purple;
         //else leds[pin_num] = CRGB::Green;
      }*/
      FastLED.show();
    
    }




   
   //int total_size, light;
   //char* tweet;

   /*First number = number of tweets*/

   //total_size = atoi(subtext[0].c_str());

   /* Parses through each new line of text file (each tweet)*/
   //for(int i = 0; i < total_size; i++)
   //{ 
     /**
     * Splits each newline into three string parameters (light, color, mode):
     *   light: number to light up
     *   color: color to light up (any HTML color name) 
     *   mode: blink, stay, off (b, s, o);
     */
    // tweet = strtok(strdup(subtext[i].c_str()), " ");
    
     /* Converts string into integer value */
    // light = atoi(tweet);


     /* Blink Mode */
    // tweet = strtok(NULL, " ");
    // char* tweet1 = tweet;
     //tweet = strtok(NULL, " ");
     //if(strcmp(tweet1, "b") == 0)     {
     //   leds[light] = (uint32_t) tweet;
      //  FastLED.show();
      //  delay(500);
        //Turns LED off
      //  leds[light] = CRGB::Black;
      //  FastLED.show();
     //}
     /* Stay Mode */ 
     //else if(strcmp(tweet1, "s") == 0)
     //{
     //   leds[light] = (uint32_t) tweet1;
     //   FastLED.show();
     //}
     /* Off Mode */
     /*else
     {
        leds[light] = CRGB::Black;
        FastLED.show();
     }*/

}



