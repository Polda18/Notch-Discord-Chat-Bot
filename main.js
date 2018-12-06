/********************************************************
 * Discord bot "Herobrine" (originaly named Notch)
 * Made by CZghost
 * Internal version of Notch: 2.0
 * Renamed to Herobrine, v1.0
 ********************************************************/

require("dotenv").config();
const mysql = require("mysql");

const Discord = require("discord.js");
const client = new Discord.Client({ disableEveryone: true });
const settings = Object.freeze({
    prefix: process.env.default_prefix,
    token: process.env.token
});
const db_settings = Object.freeze({
    host: process.env.db_host,
    port: Integer.parseInt(process.env.db_port),
    password: process.env.db_pass,
    user: process.env.db_user,
    schema: 'mySchema'
})
const fs = require("fs");

client.prefix = settings.prefix;
client.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length < 1) return console.log("No commands to load!");

    console.log(`Reading ${jsFiles.length} commands ...`);

    jsFiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.helper.name, props);
        console.log(`[${i + 1}] Command ${f} loaded`);
    });
});

// TODO: ADD DEFAULT BANWORD LIST AND CHECK FOR MYSQL DATA EXISTENCE => CREATE MYSQL TABLE WHEN NOT
client.default_config = require("./bot_config.json");

// TODO: MYSQL CONNECTION

// TODO: REMAKE TO USE MYSQL
function find_banned_words(client, message) {
    let banned_words_list = client.default_config.banned_words;

    let count = 0;
    let catch_list = [];

    banned_words_list.forEach(word => {
        let matches = message.content.toLowerCase().match(new RegExp(`(?:^|\\s)(${word})(?=\\s|$)`, "ig"))
        if (matches) {
            matches.forEach(match => {
                if (!catch_list.includes(match)) {
                    catch_list.push(match);
                    ++count;
                }
            });
        }
    });

    if (count == 0) return;

    // Muted role: @Muted
    let role = message.guild.roles.find(role => role.name.includes("Muted"));
    if (!role) return;

    if (message.member.hasPermission("MANAGE_GUILD")) return message.reply("Hey! What's up, buddy? No swearing!");

    message.member.addRole(role);
    return message.reply("You have been muted and warned for swearing!");
}

client.on("ready", () => {
    console.log(`${client.user.username} is ready`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(client.prefix)) {
        let regex_hello = /^([gnbjh]ell[io]|[gnbjh]i),?\s+[hbjn][io]tch/i;
        let regex_mood = /how'?s\s+going(\s+on)?/i;

        if (!message.content.toLowerCase().match(regex_hello)) return find_banned_words(client, message);

        if (!message.content.toLowerCase().match(regex_mood)) {
            find_banned_words(client, message);
            return message.reply("Oh, hi 😄");
        }

        // TODO: IMPROVE
        let moods = [
            "I'm fine, thanks 😃",
            "Not bad, actually 😉",
            "Could be better 🙁",
            "Don't even ask 😨"
        ]

        let mood_num = Math.floor(Math.random() * moods.length);

        find_banned_words(client, message);
        return message.channel.send(`Hi ${message.author}. ${moods[mood_num]}`);
    };

    let splitArray = message.content.split(/\s+/g);
    let command = splitArray[0].toLowerCase();
    let args = splitArray.slice(1);

    let cmd = client.commands.get(command.slice(client.prefix.length));
    if (cmd) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Sorry. It appears, you are not an administrator.");

        cmd.run(client, message, args);
    }
});

client.login(settings.token);