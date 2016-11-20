//console.log('the bot );

var Twit = require('twit');
var config = require('./config');
var led_number = [];
var led_color = [];
var led_type = [];
var fs = require("fs");
var all_requests = "";
var total_req = 0;
var all_colors = [];

fs.readFile('colors.txt', read_colors);



function read_colors(err, data)
{
	var data_string = data.toString();
	var str = data_string.substring(0, data_string.indexOf("\r"));
	while(str != "")
	{
		all_colors.push(str);
		data_string = data_string.substring(data_string.indexOf("\r") + 2);
		if(data_string.indexOf("\n") == -1)
		{
			all_colors.push(data_string);
			break;
		}
		else
			str = data_string.substring(0, data_string.indexOf("\r"));
	}
}

function binSearch(color)
{
	var l = 0;
	var u = all_colors.length - 1;
	var m = 0;
	var cC = 0;
	
	while(l < u)
	{
		m = Math.floor((u + l) / 2);
		cC = (color.toString().toLowerCase()).localeCompare(all_colors[m].toString().toLowerCase());
		//console.log((color.toString().toLowerCase()) + " " + 
		//all_colors[m].toString().toLowerCase());
		if(cC == 0)
			return 0;
		else if(cC > 0)
			l = m + 1;
		else u = m;
	}
	
	return -1;
}



var T = new Twit(config);

//tweets something
	/*T.post('statuses/update', { status: 'hello blinking lights' }, function(err, data, 
		response) { console.log(data)})
	*/

//search for tweets, what's the search + how many do you want, callback function
//T.get('search/tweets', { q: '#256sol', count: 20}, saveData)

var stream = T.stream('user');
stream.on('message', save_a_data)

setInterval(function()
{
	//console.log("here is TR: " + total_req + " " + all_requests);
	fs.writeFileSync("LEDchange.txt", total_req + "\n" + all_requests);
	//all_requests = [];
	//total_req = 0;
	//console.log("here is it wiped: " + total_req + " " + all_requests);
}, 10000);

function save_a_data(data)
{
	var tweet = data.text;
	if(tweet == undefined)
		return;
	
	var str = tweet;
	var led_numb = str.substring(0, str.indexOf(" "));
	var led_c = "";
	var led_t = "";
	if(led_numb.charAt(0) == "@")
	{
		str = str.substring(str.indexOf(" ") + 1);
		led_numb = str.substring(0, str.indexOf(" "));
	}
	else return;
		
	if(led_numb < 0 || led_numb > 49)
		return;
	
	str = str.substring(str.indexOf(" ")+1);

	led_c = str.substring(0, str.indexOf(" "));
	if(led_c == "")
		led_c = str;
	
	var color_in_hex = colourNameToHex(led_c);
	if(led_c != "none" && /*binSearch(led_c) != 0*/ color_in_hex == false)
		return;

	str = str.substring(str.indexOf(" ")+1);
	var temp = str.substring(0, str.indexOf(" "));
	if(temp != 'b' || temp != "o" || temp != "s" )
		temp = str;
	
	//console.log("lol" + temp);
	if(temp == 'o' || led_c == "none")
		led_t = 'o';
	else if(temp == 'b')
		led_t = 'b';
	else 
		led_t = 's';
	
	all_requests += led_numb + " " + color_in_hex + " " + led_t + "\n";
	total_req++;
	
	//every ten seconds or something
	
	
	//console.log(all_requests);
}


function saveData(err, data, response) {
	var tweets = data.statuses;
	var valid = 0;
	var valid_requests = "";
	//blink, stay, off
	//b      s      o
	for(var i = 0; i < tweets.length; i++)
	{
		var str = tweets[i].text;
		led_number[i] = str.substring(0, str.indexOf(" "));
		if(led_number[i].charAt(0) == '@' || led_number[i] < 0 || led_number[i] > 49)
		{
			continue;
		}
		str = str.substring(str.indexOf(" ")+1);
		led_color[i] = str.substring(0, str.indexOf(" "));
		/*if(led_color[i] == none)
			arbitrary color, set type to off :)
		if(//binary search here//)
		{
			i--;
			invalid++;
			continue;
		}*/
		str = str.substring(str.indexOf(" ")+1);
		led_type[i] = Integer.parseInt(str.substring(0, str.indexOf(" ")));
		// 0 is off, 1 is on, 2 is blink
		if(led_type[i] != 0 && led_type[i] !=2)
			led_type[i] = 1;
		
		valid_requests += led_number[i] + " " + led_color[i] + " " + led_type[i] + "\n";
		valid++;
	}
	valid_requests = (valid) + "\n" + valid_requests;
	console.log(valid_requests);
	
	fs.writeFileSync("LEDchange.txt", valid_requests);
}

function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}
