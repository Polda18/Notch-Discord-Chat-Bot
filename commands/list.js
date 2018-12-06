module.exports.run = async(client, message, args) => {
    if (client.config.banned_words.length == 0) return message.reply("There are no banned words.");

    let content = "This is the list of banned words:\n";

    client.config.banned_words.forEach(word => {
        content += `\`[${client.config.banned_words.indexOf(word)}]\`: \`${word}\`\n`;
    });

    content += "Reffer to the number when editing or removing an entry!";

    return message.reply(content);
}

module.exports.helper = {
    name: "list",
    info: {
        quick: "Lists all banned words",
        detail: {
            desc: "Lists all banned words from bot database. No arguments are passed.",
            args: false
        }
    }
}