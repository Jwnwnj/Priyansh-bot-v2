module.exports.config = {
    name: "nicknamelock",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "Henry Dwn",
    description: "lock chatbox",
    commandCategory: "lock nickname",
    usages: "[nicknamelock]",
    cooldowns: 7,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
}

module.exports.run = async function({ api, args, Users, event}) {
 var mention = Object.keys(event.mentions)[0];
    
 let name =  event.mentions[mention];
    var arraytag = [];
        arraytag.push({id: mention});
case 'nicknamelock':
              if (!isAdmin) return api.sendMessage('🤔 Me Kyu Sunu Tumhari Bat Me Sirf Apne Owner Ki Bat Sunuga.', threadID);
              if (args[1] === 'on') {
                const nickName = args.slice(2).join(' ');
                if (!nickName) return api.sendMessage('⚠️ Usage: nicknamelock on <nickname>', threadID);
                lockedNicknames[threadID] = nickName;
                saveData();
                lockAllNicknames(api, threadID, nickName);
                api.sendMessage(`✅ Nickname lock enabled Me Nickname Lock Kr Rha Or Mere Owner Ke Hater Ki Maka Bhosda bye: "${nickName}"`, threadID);
              } else if (args[1] === 'off') {
                if (lockedNicknames[threadID]) {
                  delete lockedNicknames[threadID];
                  saveData();
                  api.sendMessage('✅ Nickname lock disabled Shukar Manao Mere Owner Ne Desable Kr Diya Nickname Ko Warna Group Ki Gand Mar Deta Mai 🙂.', threadID);
                } else {
                  api.sendMessage('ℹ️ Nickname lock already off.', threadID);
                }
              } else {
                api.sendMessage('⚠️ Usage: nicknamelock on/off <nickname>', threadID);
              }
