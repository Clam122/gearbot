
exports.run = (client, message, args) => {
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send(":WrongMark: Nothing is playing at the time.");

  if(serverQueue.playing === true) {
    serverQueue.connection.dispatcher.pause();
    serverQueue.playing = false;
    return message.channel.send(":white_check_mark: Paused the music for you");
  } else {
    return message.channel.send(":WrongMark: Nothing is playing at this time.")
  }
};

exports.help = {
  name: "pause",
  description: "Pause the current song if it is playing.",
  usage: "pause",
  category: "Music"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["p"],
  permLevel: "Moderator"
};