/*
Dieses Material steht unter der Creative-Commons-Lizenz Namensnennung
Weitergabe unter gleichen Bedingungen 4.0 International.
Um eine Kopie dieser Lizenz zu sehen, besuchen Sie http://creativecommons.org/licenses/by-sa/4.0/

Titel: AstroGD Rich Presence Tool
Name / Bezeichnung des Rechteinhabers des Werkes: AstroGD
Zugeschriebene URL: http://www.astrogd.de
*/

//Setup
const {Client} = require('discord-rpc'),
log = require('fancy-log'),
readline = require("readline");

//Änderbare Variablen
var ersterstatus = "spielt mit den Tasten...";
var Clientid = "399976712210874378";
var startuppresence = "on";

//Gedöns
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
  if (oldstamp === undefined || (command.split(" ")[0].toLowerCase() !== currpresence && command.split(" ")[0].toLowerCase() !== "setstate")) {
    newstamp = new Date();
    oldstamp = newstamp;
  }
  command = command.split(" ")[0];



//HAUPTBEFEHLE
  switch (command.toLowerCase()) {
    case "onad":
      currpresence = "onad";
      log(`Status is now "on" - With AD`);
      rpc.setActivity({
        details: "Online!",
        state: currstate,
        startTimestamp: newstamp,
        endTimestamp: undefined,
        largeImageKey: "st_big",
        smallImageKey: "small",
        smallImageText: "Der Stammtisch Team Mitglied",
        largeImageText: "Discord.gg/st | Der Stammtisch, deine Community!",
        instance: false
      });
      break;
    case "on":
      currpresence = "on";
      log(`Status is now "on"`);
      rpc.setActivity({
        details: "Online!",
        state: currstate,
        startTimestamp: newstamp,
        endTimestamp: undefined,
        largeImageKey: "astrogd_pb",
        smallImageKey: "small",
        smallImageText: "Der Stammtisch Team Mitglied\nDiscord.gg/st",
        largeImageText: "Läuft reibungslos! - Ich bin da und schaue gerade auf Discord irgendwas. Das ist doch super, oder?",
        instance: false
      });
    break;
    case "off":
      currpresence = "off";
      log(`Status is now "off"`);
      rpc.setActivity({
        details: "Abwesend :(",
        state: currstate,
        startTimestamp: newstamp,
        endTimestamp: undefined,
        largeImageKey: "astrogd_away",
        smallImageKey: "small",
        smallImageText: "Der Stammtisch Team Mitglied\nDiscord.gg/st",
        largeImageText: "Leider bin ich gerade beschäftigt. Bitte schreibe mir eine DM, wenn du was brauchst ^^",
        instance: false
      });
      break;
    case "code":
      currpresence = "code";
      log(`Status is now "code"`);
      rpc.setActivity({
        details: "Programmierend",
        state: currstate,
        startTimestamp: newstamp,
        endTimestamp: undefined,
        largeImageKey: "matrix",
        smallImageKey: "small",
        smallImageText: "Der Stammtisch Team Mitglied\nDiscord.gg/st",
        largeImageText: "01001001011010101001001001011010110",
        instance: false
      });
      break;
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
      log(`Invalid command`);
      oldstamp = oldstampsafe;
      break;
  }
  rl.question("Status eingeben bitte.\nVerfügbare Status: On, OnAD, Off, Code, setstate <State>, exit\n|> ", (answer) => {
    changepresence(answer);
  });
}


const rpc = new Client({ transport: "ipc"});
rpc.on('ready', () =>{
  log('Verbunden!');
  changepresence(startuppresence);
});
rpc.login(Clientid).catch(log.error);
