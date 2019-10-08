/*
Jake's Discord bot
currently has no definite purpose or use case
exists to teach me JavaScript
enjoy
*/

const   Discord = require("discord.js"),            // Discord API
        client = new Discord.Client(),              // Set Client
        config = require("./config.json");          // contains "path" and "token"
        commands = require("./commands.js");      // (hopefully) include command file
/* console feedback for bot ready */
client.on("ready", () => {
    console.log("Bot is up");
    client.user.setActivity("jake, why")
});

/* actions on message */
client.on("message", async message => {
    if(message.author.bot) return;                  // do not interact with a bot

    if(message.content.includes(config.prefix + " reload")){
        delete require.cache[require.resolve(`./commands.js`)]; // delete cached command file
        const { exec } = require('child_process');
        exec('git pull', (err, stdout, stderr) => {
            if (err) {
            message.channel.send("failed to pull from git :(")
            return;
        }
        /* printing stdout and stderr */
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        const commands = require("./commands.js");
        message.channel.send("done!");
        });
    } else {
        commands.run(client, message, config);
    }
    
})

client.login(config.token);     // Login