//The Three packages needed:
    // npm install discord.js
    // npm install @discordjs/opus <-- The audio source, this is whats going to help play the sound of the yt video
    // npm install ytdl-core@latest <-- This downloads the youtube video from the link

const Discord = require('discord.js');
const ytdl = require("ytdl-core");

const prefix = "!";
const token = "DiscordBot Token Goes Here";
const bot = new Discord.Client();

bot.once('ready', ()=>{
    console.log("Ready!")
})

bot.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' '); //acm
    const command = args.shift().toLowerCase();

    if(command.toLowerCase() === 'youtube' || command.toLowerCase() === 'yt'){

        const voiceChannel = message.member.voice.channel;

        //This if statement checks and lets the user know to join a server.
        if(!voiceChannel){
            message.reply('You need to be in a voice channel to play or stop a youtube audio only video');
            return;
        }

        //Checks if no command after 'youtube' is given.
        if(args[0] == null || args[0]== undefined){
            message.reply("Provide a command. Valid commands are: 'play' or 'stop'. " );
            return;
        }

        switch(args[0].toLowerCase() ){
            
            case 'play':
                //This if statement whether the url is a youtube link
                if(!args[1] || args[1].indexOf("https://www.youtube.com/") === -1 ){
                    message.reply('Provide a working Youtube link!');
                    return;
                }

                //If the the link is okay and you are in a voice channel then the bot joins your channel..
                voiceChannel.join().then(connection =>{
                    // This bottom line gets the provided url code and downloads the audioonly
                    connection.play(ytdl(args[1], {filter: 'audioonly'}));                   
                });
                break;

            case 'stop':

                //Bot just leaves
                voiceChannel.leave();
                break;

            // if a command other than 'play' or 'stop' is used, it should give the bottom message.
            default:
                message.reply(`Command ${args[0]} is not valid. Try 'play' or 'stop' after youtube or yt.`)
        }
    }
})

bot.login(token);