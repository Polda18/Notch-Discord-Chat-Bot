const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    let birth = new Date(1996, 6, 16);
    let today = new Date();

    let nowDay = today.getDate();
    let birDay = birth.getDate();

    let nowMon = today.getMonth();
    let birMon = birth.getMonth();

    let nowYer = today.getFullYear();
    let birYer = birth.getFullYear();

    let age = nowYer - birYer;
    if (nowMon < birMon || (nowMon == birMon && nowDay < birDay)) --age;

    let embed = new Discord.RichEmbed()
        .setTitle("My creator is CZghost#2894")
        .setDescription(`He's ${age} years old and likes to play games, do photography and a little bit of programming.`)
        .addField("Interests", "Gaming, programming, tech, design and photography")
        .addField("Occupation", "Currently student")
        .addField("Main life goals", "Learn advanced tech stuff, work in industry, travel world")
        .addField("Current progress", "Trainee, first year of electrical engineering")
        .setFooter("Informations current to date: 9/18 2018")
        .setColor("RANDOM")
        .setTimestamp();

    return message.channel.send({ embed: embed });
}

module.exports.helper = {
    name: "creator",
    info: {
        quick: "Displays information about bot creator",
        detail: {
            desc: "Displays some basic information about bot creator in nice graphics infocard",
            args: false
        }
    }
}