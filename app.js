//Setup
const {Client} = require('discord-rpc'),
log = require('fancy-log'),
readline = require("readline"),
settings = require(`${__dirname}/settings.json`),
presences = require(`${__dirname}/presences.json`);

//Settingsimport
var ersterstatus = settings.initialstate;
var Clientid = settings.clientid;
var startuppresence = settings.presenceonstartup;
var resettimerwhenstatechanges = settings.resettimerwhenstatechanges;

//Code
var availablecommands = Object.entries(presences);
var string = "";
for (var i = 0; i < availablecommands.length; i++) {
  string += availablecommands[i][0] + ", ";
}
var currstate = ersterstatus;
var currpresence = startuppresence;
var oldstamp = undefined;
var oldstampsafe = undefined;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function changepresence(command) {
  oldstampsafe = oldstamp;
  var args = ersterstatus;
  if (command.split(" ").length > 1 && command.split(" ").slice(1).join(" ").length > 1) {
    args = command.split(" ").slice(1).join(" ");
  }
  var newstamp = oldstamp;
  if (oldstamp === undefined || (command.split(" ")[0].toLowerCase() !== currpresence && command.split(" ")[0].toLowerCase() !== "setstate") || resettimerwhenstatechanges) {
    newstamp = new Date();
    oldstamp = newstamp;
  }
  command = command.split(" ")[0].toLowerCase();
  switch (command.toLowerCase()) {
    case "setstate":
      currstate = args;
      log(`State is now "${args}"`);
      changepresence(currpresence);
      break;
    case "exit":
      console.log("Exiting...");
      process.exit();
      break;
    default:
      if (presences[command]!==undefined) {
        currpresence = command;
        log(`Status is now ${command}`);
        var options = presences[command];
        options.state = currstate;
        options.startTimestamp = newstamp;
        options.endTimestamp = undefined;
        options.instance = false;
        rpc.setActivity(options);
      } else {
        log(`Invalid command`);
        oldstamp = oldstampsafe;
      }
      break;
  }
  rl.question(`Status eingeben bitte.\nVerfügbare Status: ${string}setstate <State>, exit\n|> `, (answer) => {
    changepresence(answer);
  });
}


const rpc = new Client({ transport: "ipc"});
rpc.on('ready', () =>{
  log('Verbunden!');
  changepresence(startuppresence);
});
rpc.login({clientId:settings.clientid}).catch(log.error);
