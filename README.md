#256 Shades of Light
This project was created during a Microsoft Hackathon to have a Twitter bot feed an Arduino real-time requests for changing LED lights certain colors.

![img_20161119_222341428](https://cloud.githubusercontent.com/assets/17516547/21959443/50b5f326-da95-11e6-9a7b-8f8c0049f415.jpg)


##Introduction
256sol was an idea created in a Hackathon for the upcoming holidays.  Without the expert knowledge of Node JS, Processing 3, or Arduino Teensy, it was a rough 12 hours, but by the end of the night, a simple prototype was created in order to have something to show at the end.  Afterwards, the project code was cleaned up and the project ended up being 100% functional after a few weeks later on.

##Program Explanation
* Node JS
The Twitter bot was created using JavaScript in Node JS.  The function of the Twitter bot was to read in whenever someone directly messaged my account with the following format 'number color type' where number was the LED number that was to be lit up, color was what RGB color the LED was going to be, and type, an optional setting, that indicated whether the LED would blink, turn off, or do something else.  Every certain amount of seconds the program would save all this information to a text file.
* Processing 3
Processing 3 was mainly used to take the text file, convert the information inside to binary, and feed the Arduino real-time information on LED changes by the Twitter bot.
* Arduino Teensy
The Arduino was the micro-controller that was hooked up to the LED lights.

##How To Use
In order for the program to fully function, the code here needs to be uploaded to the Arduino and it needs to be connected to the computer.  The Node JS portion needs to be started up in the command line.  After all of this is done, once you open up the program made for Processing 3 and start it, press the red button to make it turn green and it should automatically begin to read in the text file created by the JavaScript code and feed it to the Arduino!  

##Notice
This particular version of 256sol was intended particularly for my own Twitter.  The only part that should need to be changed is the bot.js, which holds some key information for who's twitter is being accessed.  Additionally, certain files were kept out of this version of the project because they are keys specifically generated for my twitter.  And another current problem would be that these are all raw files out of their original folders.  BlinkMicrosoft, node_modules, ande processing_file were all folders in the project that I did not add here.

##Media
Here is the my Twitter I established for this project: https://twitter.com/256sol
