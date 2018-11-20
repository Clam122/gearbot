exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send(":WrongMark: Nothing is playing at the time.");
  return message.channel.send(`Now Playing: \`${serverQueue.songs[0].title}\``);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["np"],
  permLevel: "User"
};

exports.help = {
  name: "nowplaying",
  category: "Music",
  description: "What's the current song?",
  usage: "nowplaying"
};