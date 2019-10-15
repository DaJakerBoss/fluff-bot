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
                    "`announce {role name[EXACT]} #channel {message}`")
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
                message.delete;
                console.log("speaking remotely");
                // client.channels.find('id', arguments.shift()).send(arguments.join(" "));        // shift returns channel id, then sends joined message
                const remoteChannel = client.channels.find('id', arguments.shift().replace(/[\\<>@#&!]/g, ""));
                const remoteMessage = new Discord.RichEmbed()
                    .setColor('#3BCD30')
                    .setAuthor(`📤 From user: ${message.member.nickname}`)
                    .setTitle(arguments.join(" "));
                    //.setDescription(arguments.join());
                remoteChannel.send(remoteMessage);
                message.channel.send("zoop");
                break;

            case "test":    
                message.channel.send("you bet your ass it fucking works!");                     // this will mean something, eventually
                break;

            case "sleep":
                if(message.member.id == config.admin){                                          // checks for my hard-coded ID
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
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){
                    message.channel.send("You don't have the permission to do that! >:(")
                    break;
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
                if(!message.member.roles.has(`${settings[message.guild.id].minrole}`)){
                    message.channel.send("You don't have the permission to do that! >:(")
                    break;
                }
                let roleName = arguments.shift()
                let selectRole = message.guild.roles.find(({name}) => name == roleName);            // find role
                
                while(!selectRole){
                    roleName = roleName + " " + arguments.shift()
                    selectRole = message.guild.roles.find(({name}) => name == roleName);
                    if(arguments.length == 0){
                        message.channel.send("role not found!");
                        return;
                    }
                }

                let channelID = arguments.shift().replace(/[\\<>@#&!]/g, "")                        // second arg is channel ID

                try {
                    selectRole.edit({mentionable : true});                                          // ping pong
                } catch(err) {
                    message.channel.send("Failed to change role permissions!");
                    console.log("err");
                    break;
                }

                if (!client.channels.get(`${channelID}`)){
                    message.channel.send("Channel not found! Are permissions set?")
                } else {
                    try{
                        client.channels.get(`${channelID}`).send(selectRole + ": " + arguments.join(" "));      // send message
                    } catch(err) {
                        message.channel.send("failed to send the message!");
                        break;
                    } 
                }
                
                setTimeout(() => {selectRole.edit({mentionable : false})}, 500);                    // fuck ping pong
                message.channel.send("sent!");
                break;

            default:
                message.channel.send("do what now?");
                console.log("invalid command recieved");

        }
    } 
}
