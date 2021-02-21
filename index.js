// Load up the discord.js library
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const queue = new Map();

/*
 DISCORD.JS VERSION 12 CODE
*/

const client = new Discord.Client();
require('events').EventEmitter.defaultMaxListeners = 25


// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`JARVIS has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`playing the game of 2021`);
});
client.once('ready', () => {
    console.log('welcome back!');
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});
client.on("debug", console.log);


// Configure the array used for random replies
let replies = ["I don’t suffer from insanity. I enjoy every minute of it.", "God created the world. Everything else is made in China.", "Birthdays are good for you. Studies show that people who have the most of them live the longest.",
    + "It's true that we don't know what we've got until we lose it, but it's also true that we don't know what we've been missing until it arrives.", "The only way to keep your health is to eat what you don't want, drink what you don't like, and do what you'd rather not. —Mark Twain",
    + "The average woman would rather have beauty than brains, because the average man can see better than he can think.", "One of the great things about books is sometimes there are some fantastic pictures. —George W. Bush", "Always remember: you're unique, just like everyone else."
    + "When you're right, no one remembers. When you're wrong, no one forgets.", "Cheer up, the worst is yet to come.", "If you can't see the bright side of life, polish the dull side.", "Everybody wants to go to heaven, but nobody wants to die.", "I stopped fighting my inner demons, we're on the same side now.", "Well-behaved women rarely make history.",
    + "He who laughs last, didn't get it.", "Sisters are a pain to live with :joy:", "We live in an age where pizza gets to your home before the police.", "Cheese . . . milk's leap toward immortality.", " A clear conscience is usually the sign of a bad memory.", " I get enough exercise pushing my luck.",
    + " When life hands you lemons, make lemonade, find the person that life handed vodka to, and have a party.", "https://tenor.com/view/uno-no-u-reverse-card-reflect-glitch-gif-14951171"];

// Configure the randomizer that will pick a random integer from 0 to the length of the array; used for array index
let random = Math.floor(Math.random() * replies.length);

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // ignore any message that does not start with our prefix, 
  // prefix is set in the config.json file 
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }

    if (command === "pong") {
        const m = await message.channel.send("pong?");
        m.edit(`https://i.pinimg.com/originals/21/02/a1/2102a19ea556e1d1c54f40a3eda0d775.gif Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }

    if (command === "invite") {
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=603939742316363778&permissions=133295622&scope=bot")
    }
    //say command *say [message]
    if (command === "say") {
        const sayMessage = args.join(" ");
        //deletes the command message
        message.delete().catch(O_o => { });
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
    }
    //avatar command [*avatar @user]
    if (command === 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
        }
        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
        //the avatar will get someones profile picture if they are mentioned (If no one is mentioned it will just get the member who ran the commands profile picture)
    }
    //sends big clive usb charger song
    if (command === "usb")
        message.channel.send("https://youtu.be/ioAq7PI1Uwg")

  //makes the bot send a random message
    if (command === 'speek') {
        // This will create a random number EACH time the command is ran, while also staying within the range of the reply count
        let random = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[random]);
    }
    //help command
    if (command === 'help') {
        if (!args.length) {
            return message.channel.send(`You need to specify what command you require help with (Use *help commands for user commands and *help moderation for moderater commands, ${message.author}!`);
        }
        if (args[0] === 'moderation') {
            return message.channel.send('the ban command is *ban @user \n the kick command is *kick @user');
        }

        message.channel.send(`First argument: ${args[0]}`);
    }
    if (command === 'help') {
        if (!args.length) {
            return message.channel.send(`please provide a command category (the only one at the moment is commands, ${message.author}!`);
        }
        if (args[0] === 'commands') {
            return message.channel.send('> the bot prefix is * \n > the say command is * say[message]  \n > the command to get someones avatar is *avatar @member \n > the command to get a random phrase is *speek \n > The developer of the bot is BenCos18#4325 (contact me on discord if you find any bugs thanks \n > the command to get the bots ping is ping or pong');
        }

    }

    if (command === "usb")
        message.channel.send("https://youtu.be/I-sH53vXP2A")
  
  if(command === "kick") {
    // This command must be limited to mods and admins.I just hardcoded the role names.
    if(!message.member.roles.cache.some(r=>["Admin", "Moderator", "owner" , "MOD"].includes(r.name)))
      return message.reply("Sorry, you don't have permissions to use this!");
    
    //  checks if I have a member and if I can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    //also supports getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    // Now, time for a kick
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100 and with a max date of two weeks back 
    
    // gets the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
   
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // gets messages, and deletes them.
    const fetched = await message.channel.messages.fetch({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
    if (command === "ban") {
        if (!message.member.roles.cache.some(r => ["Admin", "Moderator", "owner" , "MOD"].includes(r.name)))
            return message.reply("Sorry, you don't have permissions to use this!");
        const user = message.mentions.users.first();
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user);
            // If the member is in the guild
            if (member) {
                member
                    .ban({
                        reason: 'They were bad!',
                    })
                    .then(() => {
                        // We let the message author know we were able to ban the person
                        message.reply(`Successfully banned ${user.tag}`);
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to ban the member,
                        // either due to missing permissions or role hierarchy
                        message.reply('I was unable to ban the member');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.reply("That user isn't in this guild!");
            }
        } else {
            // Otherwise, if no user was mentioned
            message.reply("You didn't mention the user to ban!");
        }
    }
});

client.login(config.token);