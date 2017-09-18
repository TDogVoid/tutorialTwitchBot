var tmi = require("tmi.js");
var say = require("say");

var sayTime;
var sayCooldown = 30 * 1000; //in millseconds

var options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "tdogvoidbot",
        password: "oauth:fdp7hz260koi82d2kec9k8wt67tq8q"
    },
    channels: ["#tdogvoid"]
};

var client = new tmi.client(options);

// Connect the client to the server..
client.connect().then(function(data){
    client.say('#tdogvoid', "connected");
}).catch(function(err){
    console.log(err);
});

client.on("chat", function(channel, userstate, message, self){
    if(self) return;
    
    msg = message.toLowerCase();

    console.log(userstate);

    if(msg == "!twitter" && Auth(userstate, true)){
        client.say(channel, userstate['display-name'] + " twitter.com/tdogvoid");
    }

    if(msg == "hi"){
        if(!sayTime || Date.now() - sayTime >= sayCooldown){
            say.speak("Welcome to my tutorial");
            sayTime = Date.now();
        } else {
            timeleft = (sayCooldown - (Date.now() - sayTime))/1000;
            client.say(channel, "say on cooldown, timeleft: " + timeleft + "s");
        }
    }
});

function Auth(userstate, allowMod){
    if(userstate.badges && userstate.badges.broadcaster == '1') {
        return true;
    } else if(userstate.mod && allowMod){
        return true;
    } else {
        return false;
    }
}