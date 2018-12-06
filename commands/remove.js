const fs = require("fs");

// TODO: REMAKE TO USE MYSQL
module.exports.run = async(client, message, args) => {
    if (args.length == 0) return message.reply("Sorry. It appears you forgot to write down the number of which one should be removed.");

    let position = parseInt(args[0]);
    if (!position) return message.reply("Sorry. It appears you didn't write in number. Reffer to list command.");

    if (!client.default_config.banned_words[position]) return message.reply("Sorry. You exceeded the range. Reffer to list command.");

    let removed_word = client.config.banned_words[position];
    client.default_config.banned_words.splice(position, 1);

    fs.writeFile("./bot_config.json", JSON.stringify(client.default_config, null, 4), err => {
        if (err) {
            console.log(err);
            return message.reply("Oops. Something went wrong. Contact bot developer.");
        }
    });

    return message.reply(`The entry number \`${position}\`: \`${removed_word}\`, has been successfully removed.`);
}

module.exports.helper = {
    name: "remove",
    info: {
        quick: "Remove an `n`th entry from the banned words list",
        detail: {
            desc: "Remove an `n`th entry from the banned words list.",
            args: {
                position: {
                    info: "Integer. Defines the position to remove. Reffer to list command for finding the required position.",
                    optional: false
                }
            }
        }
    }
}