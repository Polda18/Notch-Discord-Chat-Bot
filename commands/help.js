const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let commands = client.commands.map(cmd => cmd.helper);

    if (args.length == 0) {
        let content = "";

        commands.forEach(e => {
            content += `\`${e.name}\` - ${e.info.quick}\n`;
        });

        let reply = "Here's the list of config commands you can use:\n" +
            content + "You have to be an administrator to use these commands!";

        return message.reply(reply);
    }

    let defined_command = client.commands.filter(cmd => cmd.helper.name === args[0].toLowerCase()).first();
    console.log(defined_command);
    if (!defined_command) return message.reply("Sorry. It appears you requested wrong command help. No such command.");

    let helper = defined_command.helper;

    let embed = new Discord.RichEmbed()
        .setTitle(`${client.prefix}${helper.name}`)
        .setDescription(`${helper.info.detail.desc}`)
        .setTimestamp()
        .setColor("RANDOM");

    if (helper.not_implemented)
        embed.setFooter("NOT IMPLEMENTED YET!");

    let helper_args = helper.info.detail.args;
    if (helper_args == false) {
        embed.addField("Arguments", "none");
        return message.channel.send({ embed: embed });
    }

    let args_list = [];
    for (arg in helper_args) {
        args_list.push(arg);
    }
    embed.addField("Arguments", args_list.join(", "));

    for (var arg in helper_args) {
        embed.addField(arg, helper_args[arg].info, true)
            .addField("Required", (helper_args[arg].optional) ? "No" : "Yes", true)
            .addBlankField(false);
    }

    return message.channel.send({ embed: embed });
}

module.exports.helper = {
    name: "help",
    info: {
        quick: "Gives help",
        detail: {
            desc: "Helps to understand commands",
            args: {
                command: {
                    info: "Gives help for a specific command",
                    optional: true
                }
            }
        }
    }
}