exports.run = async (client, message, args = []) => {
    const logger = require('../../util/logger');
    // Import globals
    let globalVars = require('../../events/ready');
    try {
        const sendMessage = require('../../util/sendMessage');
        const isAdmin = require('../../util/isAdmin');
        const getTime = require('../../util/getTime');
        let adminBool = await isAdmin(client, message.member);
        if (!message.member.permissions.has("BAN_MEMBERS") && !adminBool) return sendMessage(client, message, globalVars.lackPerms);

        // Fetch all users
        let members = await message.guild.members.fetch({ force: true });
        let membersBanned = 0;

        await members.forEach(async (member) => {
            let memberAdminBool = await isAdmin(client, member);
            if (!member.permissions.has("BAN_MEMBERS") && !memberAdminBool && member.bannable && !member.user.bot) {
                try {
                    member.ban();
                    console.log(`banned ${member.user.tag}`);
                    membersBanned += 1;
                } catch (e) {
                    console.log(e);
                    sendMessage(client, message, `Failed to ban ${member.user.tag}`);
                };
            };
        });

        console.log(`Banned ${membersBanned} users`);
        sendMessage(client, message, `Banner ${membersBanned} users, lol. Good luck selling this server now. :)`)


    } catch (e) {
        // Log error
        logger(e, client, message);
    };
};

module.exports.config = {
    name: "banall",
    aliases: [],
    description: "Bans EVERYONE."
};
