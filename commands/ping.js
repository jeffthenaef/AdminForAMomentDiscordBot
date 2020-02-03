module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(msg, args) {

		const voiceChannel = msg.member.voiceChannelID;

		msg.reply('pong' + voiceChannel);
        msg.channel.send('pong');
	},
};
