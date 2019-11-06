exports.run = (client, message, config, fs, Discord) => {
let settings = JSON.parse(fs.readFileSync('./serversettings.json'));    // load settings 

    /* OwO and UwU catch, globally*/
    if(message.content.toLowerCase().includes("uwu") || message.content.toLowerCase().includes("owo")) {    // look for owo/uwu
        if (settings[message.guild.id].shutup){                                                             // check for shut
            return;
        } else {
            message.channel.send("DEGENERATE DETECTED");
        }
    }

    /*well, some servers just don't have setperm set yet, let's fix*/
    function vibeCheck(){
        if (settings[message.guild.id].minrole == null){
            message.channel.send("The role for command permissions has not been set!")
            return "failed";
        } else if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){             // check if user has specified minimum role
            message.channel.send("you don't have the permission to do that >:|");
            return "failed";
        }
    }

    /* awoo catch, globally */
    if(message.content.toLowerCase().includes("awoo")){
        if(settings[message.guild.id].shutup){                                                              // check for shut
            return;
        } else {
        message.channel.send("Stowp wight thewe cwiminaw scum, pay the couwt a fine ow sewve youw sentence, youw stowen goods awe now fowfeit");
        }
    }

    /* prefixed commands */
    if(message.content.startsWith(config.prefix)) {
       console.log("command recieved:");
        const arguments = message.content.slice(config.prefix.length).trim().split(/ +/g);      // [/ +/g] is a "find and replace" regular expressions
        let command = arguments.shift().toLowerCase();                                          // return the command, and shift all other arguments over while normalizing them
        console.log(command);

        /* command switch, prettier until I modularize */
        switch(command){
            case "help":
                const helpEmbed = new Discord.RichEmbed()       // uses a fancy-ass discord embed now
                    .setAuthor('fluff bot!')
                    .setColor('#3BCD30')
                    .setTitle("Help Menu")
                    .setDescription(`prefix: \`${config.prefix}\``)
                    .setThumbnail('https://cdn.discordapp.com/avatars/630909646579695628/984f9b9a3becb50087387b7b1c187104.png?')
                    .addField('Global Commands:',
                    "`hello` :: returns a friendly identification\n"+
                    "`returnid` :: returns guild ID\n"+
                    "`say` :: repeat a message\n"+
                    "`sayin` :: send a message to a specified channel by mention")
                    .addField('Permission-based Commands:',
                    "`sleep` :: kill the bot [admin only]\n"+
                    "`reload` :: pulls changes from git and reloads commands\n"+
                    "`announce` :: pings a given role in a given channel, then makes it unmentionable\n"+
                    "`edit` :: edits a bot announcement, I get it, we all make typos")
                    .addField('Configuration Commands',
                    "`setperm` :: sets the minimum required role to use permission-based and configuration commands\n"+
                    "`shutup` :: silences the automatic message replies\n"+
                    "`speak` :: reverses shutup")
                    .addField('Automatic Message Replies',
                    "*if shutup is set to true, these will not work*\n"+
                    "any message containing `owo`/`uwu`\n"+
                    "any message containing `awoo`\n"+
                    "I'm not gonna say what they do, figure out for yourself")
                    .addField('Syntax',
                    "*Do not use the brackets, they are for reference*\n"+
                    "`sayin #channel {message}`\n"+
                    "`setperm {role name [EXACT]}`\n"+
                    "`announce {role name[EXACT]} #channel {message}`\n"+
                    "`edit {ID of announcement message} #channel-of-announcement {new edited message}`")
                    .addField('Github',
                    "all source can be found here, along with examples of bot usage\n"+
                    "https://github.com/DaJakerBoss/fluff-bot")
                    .setFooter("by OhThat'sJake#7049, somehow", 'https://cdn.discordapp.com/avatars/554171524316135437/a0e6cbdb1aa561e1b42794797f80f405.png');
                message.channel.send(helpEmbed);
                break;

            case "hello":
                message.channel.send("Hi I'm Fluff Bot! The android sent by CyberLife!");                                           // self-explanatory
                break;

            case "returnid":
                message.channel.send(message.guild.id);                                         // currently returns guildid
                break;

            case "say":
                console.log("speaking a message");
                message.channel.send(arguments.join(" "));                                      // joins message and sends
                break;

            case "sayin":
                //message.channel.send("this command is currently disabled, check back soon!;")
                 message.delete();
                console.log("speaking remotely");
                const remoteChannel = client.channels.find('id', arguments.shift().replace(/[\\<>@#&!]/g, ""));
                const remoteMessage = new Discord.RichEmbed()
                    .setColor('#3BCD30')
                    .setAuthor(`📤 incoming transmission!`)
                    .setTitle(arguments.join(" "))
                    .setFooter(`from ${message.member.nickname}`, message.author.avatarURL);

                remoteChannel.send(remoteMessage);
                message.channel.send("zoop");
                break;

            case "test":
                message.channel.send("you bet your ass it fucking works!");                     // this will mean something, eventually
                break;

            case "sleep":
            case "kys":
            case "die":
            case "fuckoff":
            case "bye":
                if(message.member.id == config.admin){                                          // checks for my hard-coded ID
                    message.channel.send("goodnight!");
                    setTimeout(() => {process.exit(0);}, 1000);                                 // waits to exit so it doesn't asynchroniously kill itself before it talks
                } else {
                    message.channel.send("absolutely not >:P");
                    console.log("Someone tried to kill me!");
                }
                break;

            case "shutup":
                if(vibeCheck() == "failed"){             // check if user has specified minimum role
                    return;
                } else {
                    settings[message.guild.id].shutup = true;                                       // change value of shutup
                    message.channel.send("okok I will")
                    fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                    console.log("successfully changed file value");
                }
                break;

            case "speak":
                if(vibeCheck() == "failed"){
                    return;
                } else {
                    settings[message.guild.id].shutup = false;                                      // change value of shutup
                    message.channel.send("I'm back!")
                    fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                    console.log("successfully changed file value");
                }
                break;

            case "setperm":
                if(!message.member.hasPermission("ADMINISTRATOR")){
                    message.channel.send("You don't have the permission to do that! >:(")
                    return;
                }
                try {
                    settings[message.guild.id].minrole = message.guild.roles.find(({name}) => name == arguments.join(" ")).id;    // automatically grabs role since that's the only argument. sketchy, yes, I'm aware
                } catch(err) {
                    message.channel.send("invalid role name!")
                    break;
                }

                fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));       // write out changes
                console.log("successfully changed file value");
                message.channel.send("set minimum role");
                break;

            case "announce":
                if(vibeCheck() == "failed"){
                    return;
                }
                let roleName = arguments.shift()
                let selectRole = message.guild.roles.find(({name}) => name == roleName);            // find role

                while(!selectRole){                                                                 // if that fucks up then do this
                    roleName = roleName + " " + arguments.shift()
                    selectRole = message.guild.roles.find(({name}) => name == roleName);
                    if(arguments.length == 0){
                        message.channel.send("role not found!");
                        return;
                    }
                }

                let channelID = arguments.shift().replace(/[\\<>@#&!]/g, "")                        // second arg is channel ID
                if (!client.channels.get(`${channelID}`)) {                                         // catch lack of existence
                    message.channel.send("Channel not found! Are permissions set?");
                    return;
                }

                /* The following tests using `then` statements for consistency in timings */
                selectRole.edit({mentionable : true})                                               // set to mentionable
                    .catch(() => {                                                                  // catch failure on change
                        message.channel.send("Failed to change role permissions!");
                        console.log("error")
                        return;
                    })                                                                              // next we send the message
                    .then(client.channels.get(`${channelID}`).send(selectRole + ": " + arguments.join(" "))
                        .catch(() => {                                                              // catch failure on send
                            message.channel.send("Failed to send message!");
                            return;
                        }
                    ))
                    .then(                                                                          // then set back to unmentionable
                        selectRole.edit({mentionable : false})
                    );

                let announceEmbed = new Discord.RichEmbed()                                         // Embed message to be sent to command channel
                    .setAuthor('fluff bot!')
                    .setColor('#3BCD30')
                    .setTitle("Announcement Sent!")
                    .addField("Role", `${roleName}`)
                    .addField("Channel", client.channels.get(`${channelID}`).name + "\n" + "ID: " + channelID)
                    .addField("Message", arguments.join(" "))
                    .setFooter(`Command issued by ${(message.member.displayName)}`, client.user.avatarURL);
                message.channel.send(announceEmbed);
                break;

            case "eval":
                if(config.admin !== message.author.id){
                    message.channel.send("__**ABSOFUCKINGLUTELY NOT**__")
                    return;
                } else {
                    let evalReturn = eval(arguments.join(" "));
                    message.channel.send(`\`\`\`${evalReturn}\`\`\``);
                    break;
                }
            case "edit":
                if(vibeCheck() == "failed"){
                    return;
                }
                let announceMessageID = arguments.shift();                                                  // first argument is message ID
                let announceChannelID = arguments.shift().replace(/[\\<>@#&!]/g, "");                       // second argument is channel ID (can be stripped via mention)

                if(!message.guild.channels.get(`${announceChannelID}`)){                                    // if channel not found
                    message.channel.send("channel not found!");
                }
                if (!message.guild.channels.get(`${announceChannelID}`).fetchMessage(announceMessageID)){   // if message not found by ID
                    message.channel.send("Can't find the message!")
                }

                try{                                                                                        // for some fucking reason I thought this was a good idea
                    message.guild.channels.get(`${announceChannelID}`).fetchMessage(announceMessageID)      // fetch message by ID
                        .then(editMessage => {                                                              // forward message on
                            if(!editMessage.mentions.roles.first()){                                        // check if there's a mention before proceeding
                                message.channel.send("No role pinged... is this an announcement?")
                                message.channel.send(editMessage.mentions.roles.first())
                                return;
                            }

                            let originalMessage = editMessage                                               // attempt to get original content of message
                            editMessage.mentions.roles.first().edit({mentionable : true})                   // set role ping to true to ensure role stays pinged
                            .then(editMessage.edit(`${editMessage.mentions.roles.first()}: ` + arguments.join(" ")))    // edit content
                            .then(editMessage.mentions.roles.first().edit({mentionable : false}))           // set role to unpingable

                            const editEmbed = new Discord.RichEmbed()                                       // fluff's rich embed
                                .setAuthor('fluff bot!')
                                .setColor('#3BCD30')
                                .setTitle('Edited Announcement')
                                .addField('Original', originalMessage.content.trim(originalMessage.content.split(/ +/g)[0].length))
                                .addField('Edit', arguments.join(" "))
                                .setFooter(`Command issued by ${message.member.nickname}`, client.user.avatarURL);
                            message.channel.send(editEmbed);
                        });
                } catch(err) {
                    message.channel.send("Can't edit that message! Do I have permissions?")
                }
                break;

            case "info":
                delete require.cache[require.resolve("os")];
                let os = require("os");
                function cpu(){
                    try{        // *sigh* the CPU handler because iOS can't play nice
                        return os.cpus()[0].model
                    } catch(err) {
                        return cpuID = "[Not Declared, possibly iPhone]"
                    }
                }

                let infoEmbed = new Discord.RichEmbed()
                    .setAuthor('fluff bot!')
                    .setColor('#3BCD30')
                    .setTitle('Host Information')
                    .addField('OS Info',
                    `Architecture: ${os.arch()}\n`+
                    `Platform: ${os.platform()}\n`+
                    `Type: ${os.type()}`)
                    .addField('Hardware',
                    `CPU: ${cpu()}\n`+
                    `Total Memory: ${(os.totalmem().toFixed() / 1000000).toFixed()}MB\n`+
                    `Free Memory: ${(os.freemem() / 1000000).toFixed()}MB`)
                    .addField('System Uptime',
                    `${(os.uptime() / 86400).toFixed()} days, `+
                    `${((os.uptime() % 86400) / 3600).toFixed()} hours, `+
                    `${(((os.uptime() % 86400) % 3600) / 60).toFixed()} minutes, `+
                    `${(((os.uptime() % 86400) % 3600) % 60).toFixed()} seconds.`)
                    .addField("Bot Uptime",
                    `${(process.uptime() / 86400).toFixed()} days, `+
                    `${((process.uptime() % 86400) / 3600).toFixed()} hours, `+
                    `${(((process.uptime() % 86400) % 3600) / 60).toFixed()} minutes, `+
                    `${(((process.uptime() % 86400) % 3600) % 60).toFixed()} seconds.`);
                message.channel.send(infoEmbed);
                break;

            default:
                message.channel.send("do what now?");
                console.log("invalid command recieved");

        }
    }
}
