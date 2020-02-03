///needs testing

module.exports = {
	name: '!priority',
	description: 'sets the requesting user to priority speaker',
	execute(msg, args, bot) {

   //const taggedUser = msg.mentions.members.first();
   
    
    let vc = bot.channels.get(msg.member.voiceChannelID);
    vc.overwritePermissions(msg.author, {
    PPRIORITY_SPEAKER : true });
    msg.channel.send(msg.author +" is now a priority speaker")


 // NEED TO TEST
  

	},
};
