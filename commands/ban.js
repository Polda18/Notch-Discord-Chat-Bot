module.explorts.run = async(client, message, args) => {
    // TODO: Ban command
}

module.exports.helper = {
    name: "ban",
    info: {
        quick: "Bans a specified user given a reason",
        detail: {
            desc: "Bans a specified player with giver reason which must be filled in.",
            args: {
                user: {
                    info: "User to be banned (mention, name or id)",
                    optional: false
                },
                reason: {
                    info: "String. Gives reason for ban",
                    optional: false
                }
            }
        }
    },
    not_implemented: true
}