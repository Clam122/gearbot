
exports.run = (client, message, args) => {
  let serverQueue = client.queue.get(message.guild.id);
  if(!serverQueue) return message.channel.send(":WrongMark: Nothing is playing at this time.");
  
  if(serverQueue.playing === false) {
    serverQueue.connection.dispatcher.resume();
    serverQueue.playing = false;
    return message.channel.send(":white_check_mark: Resumed the music for you.")
  } else {
    return message.channel.send(":WrongMark: Nothing is paused at this time.")
  }
};

exports.help = {
  name: "resume",
  description: "resume the current song if it is paused.",
  usage: "resume",
  category: "Music"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r"],
  permLevel: "Moderator"
};