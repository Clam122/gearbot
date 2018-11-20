const ytdl = require("ytdl-core");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const vc = message.member.voice.channel;
  if (!vc) return message.channel.send("I'm sorry but you need to be in a voice channel to play music!");

  const serverqueue = client.queue.get(message.guild.id);

  const permissions = vc.permissionsFor(message.client.user);
  
  if (!permissions.has('CONNECT')) {
		return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
	}
	if (!permissions.has('SPEAK')) {
		return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
  }

  if(!args[0]) return message.channel.send("You must provide a youtube link.");

  const songInfo = await ytdl.getBasicInfo(args[0]);

  var song = {
    title: songInfo.title,
    url: songInfo.video_url
  };
  if(!serverqueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: vc,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    client.queue.set(message.guild.id, queueConstruct);
  
    queueConstruct.songs.push(song);

    try {
      var connection = await vc.join();
      queueConstruct.connection = connection;
      client.play(message.guild, queueConstruct.songs[0]);
    } catch(e) {
      client.logger.error(e);
      return message.channel.send("I could not join the voice channel.");
    }
  
  } else {
    serverqueue.songs.push(song);
    message.channel.send(`:white_check_mark: ${song.title} has been added to the queue.`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "user"
};

exports.help = {
  name: "play",
  category: "Music",
  description: "Play a youtube link or query.",
  usage: "play <link:query>"
};