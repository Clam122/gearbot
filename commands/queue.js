const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args) => {
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send(":WrongMark: Nothing is playing at the time.");

  let embed = new MessageEmbed()
    .setAuthor(`Currently Playing: **${serverQueue.songs[0].title}**`)
    .setDescription(serverQueue.songs.slice(1).map((v, i) => `**${i + 1}**: ***${v.title}***`).join("\n"));
  message.channel.send(embed)
};

exports.help = {
  name: "queue",
  description: "Show the server queue.",
  usage: "queue",
  category: "Music"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["a"],
  permLevel: "User"
};