const ytdl = require("ytdl-core");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if(message.guild.voiceConnection.channel.id !== message.member.voice.channel.id) return message.channel.send(":WrongMark: You are not in the same voice channel as me.");
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send(" :WrongMark: Nothing is playing at the time.");
  message.guild.voiceConnection.channel.leave();
  client.queue.delete(message.guild.id);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "stop",
  category: "Music",
  description: "stop the current song",
  usage: "stop"
};