const fs = require("fs");

module.exports.config = {
  name: "help",
  version: "1.0.2",
  hasPermission: 0,
  credits: "farman",
  description: "Beginners Guide",
  commandCategory: "system",
  usages: "[module Name]",
  cooldowns: 4,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20
  }
};

module.exports.languages = {
  "en": {
    "moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Cooldown: %5 seconds\n❯ Permission: %6\n\n» Module coded by 𝗕𝗛𝗨𝗕𝗔𝗡  «",
    "helpList": '[ There are %1 commands on this bot. Use: "%2help commandName" to learn more! ]',
    "user": "User",
    "adminGroup": "Admin Group",
    "adminBot": "Admin Bot"
  }
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body === "cmd" || body.indexOf("help") !== 0) return;

  const img = "";
  const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);

  if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  const message = {
    body: getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermission === 0) ? getText("user") : (command.config.hasPermission === 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
    ),
    attachment: fs.createReadStream("img.gif")
  };

  return api.sendMessage(message, threadID, (error, info) => {
    if (autoUnsend) {
      setTimeout(() => {
        api.unsendMessage(info.messageID);
      }, delayUnsend * 1000);
    }
  });
};

module.exports.run = function ({ api, event, args, getText }) {
  const { commands } = global.client;
  const { threadID, messageID } = event;
  const command = commands.get((args[0] || "").toLowerCase());
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;
    let i = 0;
    let msg = "╭─🅒🅞🅜🅜🅐🅝🅓 🅛🅘🅢🅣─╮\n\n□▬▬▬▬▬▬▬▬▬▬▬▬□\n";

    for (const [name] of commands) {
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage * page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (const item of returnArray) msg += `   ➳  ${++i} ⇝ ${item}\n`;
    const randomText = ["hy bhy baby", "g", "h"];
    const text = `■▬▬▬▬▬▬▬▬▬▬▬▬■\n╭──────╮\n✅ 𝐏𝐀𝐆𝐄   (${page}/${Math.ceil(arrayInfo.length / numberOfOnePage)})✅\n╰──────╯\n𝒯𝓎𝓅𝑒: ${prefix}𝐇𝐞𝐥𝐩 \n𝐓𝐨𝐭𝐚𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${arrayInfo.length} \nஇ▬▬▬▬▬▬▬▬▬▬▬▬இ\n\n\n  \n\n \n\n\n\n\n\n\n\n \n\n\n\n \n     \n\n\n \n\n`;
    return api.sendMessage(msg + text, threadID, async (error, info) => {
      if (autoUnsend) {
        await new Promise((resolve) => setTimeout(resolve, delayUnsend * 10000));
        return api.unsendMessage(info.messageID);
      } else return;
    });
  }

  return api.sendMessage(
    getText(
      "moduleInfo",
      command.config.name,
      command.config.description,
      `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
      command.config.commandCategory,
      command.config.cooldowns,
      ((command.config.hasPermission === 0) ? getText("user") : (command.config.hasPermission === 1) ? getText("adminGroup") : getText("adminBot")),
      command.config.credits
    ),
    threadID,
    messageID
  );
};
