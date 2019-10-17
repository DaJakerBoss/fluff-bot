/*
Jake's Discord bot
currently has no definite purpose or use case
exists to teach me JavaScript
enjoy
*/

const   Discord = require("discord.js"),            // Discord API
        client  = new Discord.Client(),              // Set Client
        config  = require("./config.json"),          // contains "path" and "token"
        fs      = require('fs');                   // fs for server settings readout

/* console feedback for bot ready */
client.on("ready", () => {
    console.log("Bot is up");
    client.user.setActivity("jake, why")
});

client.on("messageReactionAdd", async messageReaction => {
    console.log("reaction detected")
    let pinboard = require("./pinboard.js");
    pinboard.run(client, messageReaction, config, fs, Discord);
})

/* actions on message */
client.on("message", async message => {
    // if(message.author.bot) return;                              // do not interact with a bot

    if(message.content.includes(config.prefix + " reload")){    // look for the reload command explicitly
        delete require.cache[require.resolve('./commands.js')]; // delete cached command file
        delete require.cache[require.resolve('./pinboard.js')]; // delete cached pinboard file

        const { exec } = require('child_process');
        exec('git pull https://github.com/dajakerboss/fluff-bot.git', (err, stdout, stderr) => {    // run git pull
            if (err) {                                          // in the event of a github fuck
            message.channel.send("failed to pull from git :(")
            return;
        }

        if (!stdout.includes("Already")){
            /* printing stdout and stderr from terminal */
            console.log(`output: ${stdout} \n ${stderr}`);
            message.channel.send(`\`\`\`git Output: \n${stdout} \ngit Error (untested): \n${stderr}\`\`\``)
        }

        message.channel.send("done!");
        });
    } else {
        let commands = require("./commands.js");        // require command file on run
        let settings = JSON.parse(fs.readFileSync("./serversettings.json"));
        if(!settings[message.guild.id]){
            settings[message.guild.id] = {};
            fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
            console.log("successfully added server");
        }
        commands.run(client, message, config, fs, Discord);      // the world's shittiest command handler :)
    }
    
})

client.login(config.token);     // Login