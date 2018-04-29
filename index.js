/*
Mei Discord Bot
Built with discord.js in Node
*/

// required libraries. (NOTE: Some commands do have module dependencies so check them out as well)
require("dotenv").config();
const Commando = require("discord.js-commando");
const sqlite = require("sqlite");
const path = require("path");
const chalk = require("chalk");

// client
const client = new Commando.Client({
  owner: "175565380981358592",
  commandPrefix: ">",
  disableEveryone: true,
  unknownCommandResponse: false,
  guildOnly: true,
});

// for console logging. Useful for debugging
client.on("error", console.error);
client.on("warn", console.warn);
client.on("debug", console.log);
client.on("ready", () => {

  console.log(chalk.green(`[READY] Mei is now up and running as ${client.user.tag}`));
  client.user.setActivity(">help", ["Playing"]);

});
client.on("disconnect", event => {

  console.error(chalk.red(`[DISCONNECT] Disconnected with code ${event.code}.`));
  process.exit(0);

});
client.on("commandError", (cmd, err) => {

  if (err instanceof Commando.FriendlyError) return;
  console.error(chalk.red("[ERROR] Error in command $cmd.groupID:$cmd.memberName", err));

});

// non-error logging (guild updates)
client.on("guildCreate", (guild) => {
  console.log(chalk.blue("[UPDATE] Joined Guild:" + " " + `${guild.name}` + " " + `(${guild.id})`));
});
client.on("guildDelete", (guild) => {
  console.log(chalk.blue("[UPDATE] Left Guild:" + " " + `${guild.name}` + " " + `(${guild.id})`));
});
client.on("guildUnavailable", (guild) => {
  console.log(chalk.blue("[UPDATE] Guild Unavailable:" + " " + `${guild.name}` + " " + `(${guild.id})`));
});
client.on("guildUpdate", (oldGuild, newGuild) => {
  console.log(chalk.blue("[UPDATE] Guild Updated: From:" + " " + `${oldGuild.name}` + " " + `(${oldGuild.id})` + " to"  + " " + `${newGuild.name}` + " " + `(${newGuild.id})`));
});

// settings provider, using sqlite
client.setProvider(
  sqlite.open(path.join(__dirname, "database.sqlite3")).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

// command group registries
client.registry.registerGroups([
  ["core","Core"],
  ["mod","Mod"],
  ["info","Info"],
  ["fun","Fun"],
  ["booru","Booru"],
  ["images","Images"],
  ["nsfw","NSFW"],
  ["reactions","Reactions"],
  ["roleplay","Roleplay"],
]);
client.registry.registerDefaults();
client.registry.registerCommandsIn(path.join(__dirname, "commands"));

// now we log in OwO
client.login(process.env.BOT_TOKEN);
