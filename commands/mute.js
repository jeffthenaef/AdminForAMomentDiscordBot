
// needs testing
module.exports = {
	name: '!mute',
	description: 'mute a selected user',
	execute(msg, args, bot) {
        
        
        if (msg.mentions.users.size)
        {
            const taggedUser = msg.mentions.members.first();
            let vc = bot.channels.get(msg.member.voiceChannelID);
            console.log(msg.member.voiceChannelID);
          vc.overwritePermissions(taggedUser, {
          SPEAK : false });
        msg.channel.send(taggedUser +" has now been muted")
    
        }else {
            msg.reply('Please tag a valid user using the @ sign')
        }

	},
};
