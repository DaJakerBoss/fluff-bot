exports.run = (client, message, config, fs, Discord) => {
let settings = JSON.parse(fs.readFileSync('serversettings.json'));

    message.channel.fetchMessage(message.id).then(r => {
    return console.log(r.reactions.filter(a => a.emoji.name == '👎').map(reaction => reaction.count)[0]);
});
}