const fs = require("fs");

// TODO: REMAKE TO USE MYSQL
module.exports.run = async(client, message, args) => {
    if (args.length == 0) return message.reply("I'm sorry, but it appears you ommited a regular expression to add.");

    if (client.default_config.banned_words.includes(args[0])) return message.reply("This expression is already in my database.");
    client.default_config.banned_words.push(args[0]);

    fs.writeFile("./bot_config.json", JSON.stringify(client.default_config, null, 4), err => {
        if (err) {
            console.log(err);
            return message.reply("Oops. Something went wrong. Contact bot developer.");
        }
    });

    return message.reply(`Banned words have been updated by new regex entry: \`${args[0]}\`.`);
}

module.exports.helper = {
    name: "add",
    info: {
        quick: "Adds an entry to words blacklist",
        detail: {
            desc: "Add a word entry into blacklist. This command involves regular expressions for better word match. Reffer to `regex` help page or click [Regular Expressions Guideline](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) for complete details.",
            args: {
                regex: {
                    info: "Regular expression of banned word",
                    optional: false
                }
            }
        }
    }
}