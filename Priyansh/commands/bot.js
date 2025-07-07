const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "goibot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Fixed By Arun Kumar",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Kolkata").format("DD/MM/YYYY || HH:mm:ss");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["Lundwan Urf Lo0d3nath Ki Maki Chut Smjha Bhai 🙃","Sita Chodak Sanatani logo ki bur katal batak don here 🙃','Lindu'S + Helper Chud Gaye ji 😂"] var rand = tl[Math.floor(Math.random() * tl.length)]
   mess = "{name}"
  if (event.body.indexOf("Bot") == 0 || (event.body.indexOf("पार्वती") == 0)) {
    var msg = {
      body: `🔶${name}🔶,  \n\n『\n   ${rand} 』\n\n❤️𝙲𝚛𝚎𝚍𝚒𝚝𝚜 : 𝗛𝗘𝗡𝗥𝗬 𝗕𝗔𝗗𝗠𝗔𝗦𝗛 `
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
