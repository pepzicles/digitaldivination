//VARIABLES FOR SENTIMENT ANALYSIS
import Sentiment from 'sentiment';
var sentiment = new Sentiment();
//let score = 0;
let input = "";
let sentimentOutput = "testing";


//VARIABLES FOR SPOTIFY
let randomSong;
let randomSadSong = "";
let randomNeutralSong = "";
let randomHappySong = "";

function random_item(items)
{
  return items[Math.floor(Math.random()*items.length)];
}





//SPOTIFY

var sadSongs = [
  "https://open.spotify.com/embed/track/4uROR0y5k7u1bMfFOmc4WK?utm_source=generator",
  "https://open.spotify.com/embed/track/0xtIp0lgccN85GfGOekS5L?utm_source=generator",
  "https://open.spotify.com/embed/track/5WbfFTuIldjL9x7W6y5l7R?utm_source=generator",
  "https://open.spotify.com/embed/track/2lwi35A2ym3FAmSlvOGnQp?utm_source=generator",
  "https://open.spotify.com/embed/track/3WvXuzuXtV5krsWIiNt3Vo?utm_source=generator"];
  randomSadSong = random_item(sadSongs);
  //console.log("Random Sad Song: " + randomSadSong);


var neutralSongs = [
  "https://open.spotify.com/embed/track/0Y0yykDeSGqg0whcAh5wHR?utm_source=generator",
  "https://open.spotify.com/embed/track/0WlvboUTfGNKzsszxTa9YI?utm_source=generator",
  "https://open.spotify.com/embed/track/3kKVqFF4pv4EXeQe428zl2?utm_source=generator",
  "https://open.spotify.com/embed/track/1p7800C2UKX0w5EWBYKT0y?utm_source=generator",
  "https://open.spotify.com/embed/track/5cgB9o3llPiEDWVE9qhqWB?utm_source=generator"
]
randomNeutralSong = random_item(neutralSongs);
//console.log("Random Neutral Song: " + randomNeutralSong);


var happySongs = [
  "https://open.spotify.com/embed/track/3LlzsDGunYpcU4OF8dnLRN?utm_source=generator",
  "https://open.spotify.com/embed/track/3FBelUuzZ5IVjJVVbIwOIS?utm_source=generator",
  "https://open.spotify.com/embed/track/3OJ0qtEbfXrqSWizwfKkaZ?utm_source=generator",
  "https://open.spotify.com/embed/track/0V8jGgK39sLsj2yAHHPigU?utm_source=generator",
  "https://open.spotify.com/embed/track/5saMo1BtSHW111VrurVHe8?utm_source=generator"
]
randomHappySong = random_item(happySongs);
//console.log("Random Happy Song: " + randomHappySong);




//SENTIMENT ANALYSIS
function returnText(){
    input = document.getElementById("userInput").value;
    console.log("User's Input: " + input);
    return input;
}

function sentimentFunction(){
    var feelings = returnText();
    var docx = sentiment.analyze(feelings);
    console.log("Sentiment score: " + docx.score);
    //console.log("feelings: " + feelings);
    //score = docx.score;
    //console.log(`sentiment running: ${docx.score}`);
    
    if (docx.score == -1){
        console.log("Sentiment: Negative x1");
        sentimentOutput = "😮‍💨🌧🤦🏼";
        randomSong = randomSadSong;
        randomArt = randomSadArt;
    }

    else if (docx.score == -2){
        console.log("Sentiment: Negative x2");
        sentimentOutput = "😰🌫🫠";
        randomSong = randomSadSong;
        randomArt = randomSadArt;
    }

    else if (docx.score == -3){
        console.log("Sentiment: Negative x3");
        sentimentOutput = "😵💔🌪";
        randomSong = randomSadSong;
        randomArt = randomSadArt;
    }
    
    else if (docx.score == 0){
        console.log("Sentiment: Neutral");
        sentimentOutput = "😐👀💻";
        randomSong = randomNeutralSong;
        randomArt = randomNeutralArt;
    }
    
    else if (docx.score == 1){
        console.log("Sentiment: Positive x1");
        sentimentOutput = "🙂👌";
        randomSong = randomHappySong;
        randomArt = randomHappyArt;
    }   
    
    else if (docx.score == 2){
        console.log("Sentiment: Positive x2");
        sentimentOutput = "😁👍";
        randomSong = randomHappySong;
        randomArt = randomHappyArt;
    }   
    
    else if (docx.score == 3){
        console.log("Sentiment: Positive x3");
        sentimentOutput = "🙆❤️🫶";
        randomSong = randomHappySong;
        randomArt = randomHappyArt;
    }   
    //Print out the sentiment into index.html 
    //document.getElementById("sentiment-p").innerHTML = sentimentOutput;
    document.getElementById("sentiment-p").innerHTML = `${sentimentOutput}`
    
    //Print out the Spotify URL into index.html 
    function changeSong(){
        var SpotifyURL = document.getElementById("spotify-url");
        SpotifyURL.src = randomSong;
        console.log(randomSong);
    }
    changeSong();
    console.log("Sentiment Output is here: " + sentimentOutput); 
}

var userForm = document.getElementById("userForm");

//Run Sentiment Function when clicked on Enter button OR when pressed enter
var el = document.getElementById("demo");
el.addEventListener("click", sentimentFunction); 
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sentimentFunction();
    }
});

// var el = document.getElementById("demo");
// el.addEventListener("click", returnText(), false); 
//console.log(score);
