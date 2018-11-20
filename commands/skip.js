exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send("Nothing is playing at the time");
  serverQueue.connection.dispatcher.end();
  message.channel.send("Skipped the current song :thumbsup:");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "skip",
  category: "Music",
  description: "skip the current song",
  usage: "skip"
};