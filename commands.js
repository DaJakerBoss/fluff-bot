exports.run = (client, message, config, fs, Discord) => {
let settings = JSON.parse(fs.readFileSync('./serversettings.json'));    // load settings 

    /* OwO and UwU catch for Dank Meme Channel */
    if(message.content.toLowerCase().includes("uwu") || message.content.toLowerCase().includes("owo")) {    // look for owo/uwu
        if (settings[message.guild.id].shutup){                                                             // check for shut
            return;
        } else {
            message.channel.send("DEGENERATE DETECTED");
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
                    "`hello` :: returns a friendly message\n"+
                    "`returnid` :: returns guild ID\n"+
                    "`say` :: repeat a message\n"+
                    "`sayin` :: send a message to a specified channel by ID")
                    .addField('Permission-based Commands:',
                    "`sleep` :: kill the bot\n"+
                    "`reload` :: pulls changes from git and reloads commands\n"+
                    "`announce` :: pings a set announcement role in a set channel, then makes it unmentionable\n\n")
                    .addField('Configuration Commands',
                    "`setperm` :: sets the minimum required permission to use permission-based and configuration commands\n"+
                    "`setannounce` :: sets the announcement role and channel, then makes it unpingable\n"+
                    "`shutup` :: silences the automatic message replies\n"+
                    "`speak` :: reverses shutup")
                    .addField('Automatic Message Replies',
                    "*if shutup is set to true, these will not work*\n"+
                    "any message containing `owo`/`uwu`\n"+
                    "any message containing `awoo`\n"+
                    "I'm not gonna say what they do, figure out for yourself")
                    .addField('Syntax',
                    "*Do not use the brackets, they are for reference*\n"+
                    "`sayin {channel ID} {message}`\n"+
                    "`setperm {roleID}`\n"+
                    "`setannounce @role #channel`")
                    .setFooter("by OhThat'sJake#7049, somehow", 'https://cdn.discordapp.com/avatars/554171524316135437/a0e6cbdb1aa561e1b42794797f80f405.png');
                message.channel.send(helpEmbed);
                break;

            case "hello":   
                message.channel.send("Hello bitch!");                                           // self-explanatory
                break;

            case "returnid":
                message.channel.send(message.guild.id);                                         // currently returns guildid
                break;

            case "say":     
                console.log("speaking a message");
                message.channel.send(arguments.join(" "));                                      // joins message and sends
                break;

            case "sayin":   
                console.log("speaking remotely");
                client.channels.find('id', arguments.shift()).send(arguments.join(" "));        // shift returns channel id, then sends joined message
                message.channel.send("zoop");
                break;

            case "test":    
                message.channel.send("you bet your ass it fucking works!");                     // this will mean something, eventually
                break;

            case "sleep":
                if(message.member.id == config.admin){                                           // checks for my hard-coded ID
                    message.channel.send("goodnight!");
                    setTimeout(() => {process.exit(0);}, 1000);                                 // waits to exit so it doesn't asynchroniously kill itself before it talks
                } else {
                    message.channel.send("absolutely not >:P");
                    console.log("Someone tried to kill me!");
                }
                break;

            case "shutup":  
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){             // check if user has specified minimum role
                    message.channel.send("you don't have the permission to do that >:|");
                } else {
                    settings[message.guild.id].shutup = true;                                       // change value of shutup
                    message.channel.send("okok I will")
                    fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                    console.log("successfully changed file value");
                }
                break;

            case "speak":   
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){             // check if user has specified minimum role
                 message.channel.send("you don't have the permission to do that >:|");
                } else {
                    settings[message.guild.id].shutup = false;                                      // change value of shutup
                    message.channel.send("I'm back!")
                    fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                    console.log("successfully changed file value");
                }
                break;

            case "setperm": 
                settings[message.guild.id].minrole = arguments                                      // automatically grabs role since that's the only argument. sketchy, yes, I'm aware
                fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));       // write out changes
                console.log("successfully changed file value");
                message.channel.send("set minimum role");
                break;
            
            case "setannounce":
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){                     // check if user has specified minimum role
                    message.channel.send("you don't have the permission to do that >:|");
                } else {
                    settings[message.guild.id].announcerole = message.mentions.roles.first().id;            // sets for first mentioned role, should be the only role by syntax
                    settings[message.guild.id].announcechannel = arguments[1].replace(/[\\<>@#&!]/g, "");   // grabs channel from a #channel mention by removing all special characters
                    message.mentions.roles.first().edit({mentionable : false});                             // makes sure the role is no longer pingable
                    fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));           // write out changes
                    console.log("successfully changed file value");
                    message.channel.send("set announcement role and channel, role is now unpingable");
                }
                break;

            case "announce":
                if(!settings[message.guild.id].announcerole || !settings[message.guild.id].announcechannel){// checks beforehand to ensure the proper fields are set
                    message.channel.send("You have not set up announcements!");
                }
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){                     // check if user has specified minimum role
                    message.channel.send("you don't have the permission to do that >:|");
                } else {
                    let role = message.guild.roles.find("id", `${settings[message.guild.id].announcerole}`);// grabs role by previously set ID
                    role.edit({mentionable : true});                                                        // sets to mentionable

                    /* in this godforsaken line, it navigates to the specified channel, joins the arguments, and sends them, while pinging the specified role */
                    client.channels.get(`${settings[message.guild.id].announcechannel}`).send(`<@&${settings[message.guild.id].announcerole}>: ` + arguments.join(" "));
                    setTimeout(() => {role.edit({mentionable : false})}, 1000);                             // sets role to not be mentionable
                    message.channel.send("should have sent!");
                }
                break;

            default:
                message.channel.send("do what now?");
                console.log("invalid command recieved");

        }
    } 
}
