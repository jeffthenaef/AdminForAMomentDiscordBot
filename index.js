//require('dotenv').config();

var Twitter =  require('twitter');
var config = require('./config');

const Discord = require('discord.js');
const bot = new Discord.Client();
const { init, addUser, getUser, updateAccount,updatePostedTwitterCol, searchPostedTweets } = require('./db')
init();
const Joi = require('@hapi/joi');
const ObjectID = require('mongodb').ObjectID;
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const TOKEN = 'NjcyNzU4NDcyMTU2MzgxMTg1.XjaaCQ.0BQ228jqfTuZrNa24DnOVwkT1BU';

var T = new Twitter(config);

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

const userSchema = Joi.object().keys({
    Username: Joi.string(),
    Account: Joi.number().integer().min(0)
})

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    monitorGeneralChannel();
   monitorTwitter();
   
    
});

function monitorTwitter(){
    //testing twitter bot

    var params = {screen_name: 'playapex'};
T.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    //console.log(tweets);
    tweets.map((tweet)=>{
    const {created_at, user : {screen_name}, text, id} = tweet
    
    //date tweet was created
    var nd = new Date(created_at)
      
    
    const todaysDate = new Date()


    let c = new Discord.Channel;
    c = bot.channels.get('674197719736123392') // for Blicky apex updates

        //console.log(id);
      
   
       
        searchPostedTweets(id).then(data =>{
            if(data == null)
            {
            
            if(tweet != null)
            {
                var str = text.toString();
               
                if(!str.startsWith("@") && !str.startsWith("RT")){
                    //console.log("msg: ")
                    //console.log(text);
                       c.send(text); 
                       updatePostedTwitterCol(id);
                }
                
                
            }

            }else 
            {
    
                
            }
            }).catch(err => console.error(err))
        
  
    });

  }
})


};

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!bot.commands.has(command)){
       
        getUser(msg.member.user.username)
        .then(data => {
           
           if(data != null){
         
            const {_id, Account} = data;
           
          
           let newAccountTotal = Account + 10;
          
   
           addPoints(_id, newAccountTotal )
           console.log("10 points have been added to " + msg.member.user.username + " for being active in chat");
           }else{
               addUser(msg.member.user.username);
           }
            })
            .catch(err => console.error(err))

    return;} 
    console.info(`Called command: ${command}`);
    try {
        bot.commands.get(command).execute(msg, args, bot);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});

   function monitorGeneralChannel(){
   
       // console.log();
       const vc = bot.channels.get('502494364283568143'); //currently just monitors the VC in my discord will update to diversify later
       
       vc.members.forEach(function(guildMember,guildMemberId){
          
           if(guildMemberId != null){
                  
           getUser(guildMember.user.username)
           .then(data => {
              if(data != null){
              // console.log( data ) 
              
               const {_id, Account} = data;
              //console.log(_id);
             
              let newAccountTotal = Account + 10;
               //console.log(newAccountTotal);
   
              addPoints(_id, newAccountTotal )
              }else{
                  addUser(guildMember.user.username);
              }
               object = data})
               .catch(err => console.error(err))
          
           console.log("10 points have been added to " + guildMember.user.username);
           
           }
       });
   
      }
     
      function addPoints(id, points){
       updateAccount(id, points);
       
   }
   setInterval(function() {
             monitorGeneralChannel();
       }, 7000);  
    
//        setInterval(function() {
//         monitorGeneralChannel();
//   }, 21600000 );  
