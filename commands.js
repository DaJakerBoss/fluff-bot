exports.run = (client, message, config, fs) => {
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
            case "help":    message.channel.send("```\n"+                                                   // sends disgusting-ass message
                            "HELP MENU\n"+
                            "*********\n"+
                            "\n"+
                            "Bot Usage:\n"+
                            "hello :: returns a friendly message\n"+
                            "returnid :: returns guild ID\n"+
                            "say :: repeat a message\n"+
                            "sayin :: send a message to a specified channel by ID\n"+
                            "sleep :: kill the bot\n"+
                            "shutup :: silences the automatic message replies\n"+
                            "speak :: reverses shutup\n"+
                            "reload :: pulls changes from git and reloads commands [WIP]\n"+
                            "\n"+
                            "there's two other triggers that you'll find without difficulty.\n"+
                            "have fun\n"+
                            "```");
                            break;

            case "hello":   message.channel.send("Hello bitch!");                                           // self-explanatory
                            break;

            case "returnid":message.channel.send(message.guild.id);                                         // currently returns guildid
                            break;

            case "say":     console.log("speaking a message");
                            message.channel.send(arguments.join(" "));                                      // joins message and sends
                            break;

            case "sayin":   console.log("speaking remotely");
                            client.channels[arguments.shift()].send(arguments.join(" "));                   // shift returns channel id, then sends joined message
                            message.channel.send("zoop");
                            break;

            case "test":    message.channel.send("you bet your ass it fucking works!");                     // this will mean something, eventually
                            break;

            case "sleep":   message.channel.send("goodnight!");
                            setTimeout(() => {process.exit(0);}, 1000);                                     // waits to exit so it doesn't asynchroniously kill itself before it talks
                            break;

            case "shutup":  settings[message.guild.id].shutup = true;                                       // change value of shutup
                            message.channel.send("okok I will")
                            fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                            console.log("successfully changed file value");
                            break;

            case "speak":   settings[message.guild.id].shutup = false;                                      // change value of shutup
                            message.channel.send("I'm back!")
                            fs.writeFileSync('./serversettings.json', JSON.stringify(settings, null, 4));   // write out changes
                            console.log("successfully changed file value");
                            break;

        }
    } 
}
