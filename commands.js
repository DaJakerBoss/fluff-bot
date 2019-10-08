exports.run = (client, message, config) => {
    /* OwO and UwU catch for Dank Meme Channel */
    if(message.content.toLowerCase().includes("uwu") || message.content.toLowerCase().includes("owo")) {    // look for owo/uwu
        console.log("DEGENERATE DETECTED");
            if(message.channel.id == "600109451348934666") {                                                // ensure dank meme channel
            console.log("permission to kill granted");
            message.channel.send("Begone degenerate!");
        }
    }

    /* awoo catch, globally */
    if(message.content.toLowerCase().includes("awoo")){
        console.log("awoo fine in place")
        message.channel.send("Stowp wight thewe cwiminaw scum, pay the couwt a fine ow sewve youw sentence, youw stowen goods awe now fowfeit");
    }

    /* prefixed commands */
    if(message.content.startsWith(config.prefix)) {
       console.log("command recieved:");
        const arguments = message.content.slice(config.prefix.length).trim().split(/ +/g);      // [/ +/g] is a "find and replace" regular expressions
        let command = arguments.shift().toLowerCase();                                        // return the command, and shift all other arguments over while normalizing them
        console.log(command);

        /* command switch, prettier until I modularize */
        switch(command){
            case "help":    message.channel.send("```\n"+
                            "HELP MENU\n"+
                            "*********\n"+
                            "\n"+
                            "Bot Usage:\n"+
                            "hello :: returns a friendly message\n"+
                            "returnid :: returns channel ID\n"+
                            "say :: repeat a message\n"+
                            "\n"+
                            "there's one other trigger that you'll find without difficulty.\n"+
                            "have fun\n"+
                            "```");
                            break;
            case "hello":   message.channel.send("Hello bitch!");
                            break;
            case "returnid":message.channel.send(message.channel.id);
                            break;
            case "say":     console.log("speaking a message");
                            message.channel.send(arguments.join(" "));
            case "sayin":   console.log("speaking remotely");
                            client.channels.find('id', arguments.shift()).send(arguments.join(" "));
            case "test":    message.channel.send("it fucking doesn't work yet >:(");
        }
    } 
}
