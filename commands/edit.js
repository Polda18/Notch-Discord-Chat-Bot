const fs = require("fs");

module.exports.run = async(client, message, args) => {
    if (args.length == 0) return message.reply("Sorry. It appears you forgot to write down the number of which one should be removed.");

    let position = parseInt(args[0]);
    if (!position) return message.reply("Sorry. It appears you didn't write in number. Reffer to list command.");

    if (!client.default_config.banned_words[position]) return message.reply("Sorry. You exceeded the range. Reffer to list command.");

    if (args.lenght < 2) return message.reply("Sorry. It appears you forgot to write down new regular expression to edit.");

    if (client.default_config.banned_words.includes(args[1])) return message.reply("Sorry. It appears you're trying to change an entry to an existing one.");

    let original_word = client.default_config.banned_words[position];
    client.config.banned_words[position] = args[1];

    fs.writeFile("./bot_config.json", JSON.stringify(client.default_config, null, 4), err => {
        if (err) {
            console.log(err);
            return message.reply("Oops. Something went wrong. Contact bot developer.");
        }
    });

    return message.reply(`The entry number \`${position}\`: \`${original_word}\`, has been successfully edited to new content: \`${client.config.banned_words[position]}\``);
}

module.exports.helper = {
    name: "edit",
    info: {
        quick: "Edits an `n`th entry.",
        detail: {
            desc: "Edits an `n`th entry in words blacklist. This command involves regular expressions for better word match. Reffer to `regex` help page or click [Regular Expressions Guideline](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) for complete details.",
            args: {
                position: {
                    info: "Integer. Defines the position to edit. Reffer to list command for finding the required position.",
                    optional: false
                },
                regex: {
                    info: "New regular expression of banned word to replace the old one",
                    optional: false
                }
            }
        }
    }
}