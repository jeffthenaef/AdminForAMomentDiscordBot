module.exports = {
	name: '!ptt',
	description: 'enforce ptt',
	execute(msg, args, bot) {
        
        
        if (msg.mentions.users.size){
      
            const taggedUser = msg.mentions.members.first();
      
            let vc = bot.channels.get(msg.member.voiceChannelID);
           
         vc.overwritePermissions(taggedUser, {
            USE_VAD : false });
          msg.reply(taggedUser +" has now been inflicted with the PPT bug")
         }else{
            msg.reply('Please tag a valid user using the @ sign')
         }
      


                            },
                };
