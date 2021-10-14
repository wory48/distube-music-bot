const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'pause',
	aliases: ['wait'],

	async execute(client, message, args) {
		if (!message.member.voice.channel) return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`You must be a voice channel before using this command.`)]});
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`You are not in same voice channel.`)]});
		
        let queue = await client.distube.getQueue(message);
		if (!queue) return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`There are no songs in the queue.`)]});
		
        try {
            await client.distube.pause(message); 
            return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.color).setDescription(`Current track has been paused.`)]});
        } catch {
            return message.channel.send({embeds: [new MessageEmbed().setColor(client.color.error).setDescription(`Current track is already paused.`)]});
        }
    }
}