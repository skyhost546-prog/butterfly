const { cmd, commands } = require('../command');
const os = require('os');
const config = require('../config');

// Helper for runtime
const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

// Helper for formatBytes
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

cmd({
    pattern: "menu",
    desc: "Menu for all commands",
    category: "main",
    filename: __filename,
    react: "📚"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const commandslist = {};

        commands.forEach(cmdObj => {
            if (cmdObj.dontAddCommandList === false && cmdObj.pattern !== undefined) {
                let match = cmdObj.pattern;
                const HANDLER = config.PREFIX || '.';
                
                let category = cmdObj.category || 'misc';
                if (!commandslist[category]) commandslist[category] = [];
                commandslist[category].push((HANDLER + match).trim());
            }
        });

        const ownerName = "*Mᴇᴄ Iᴅᴇᴀʟ*";
        const botName = "BUTTERFLY-16 MD V2";
        const mode = "public";
        const version = "1.0.0";
        
        let msg = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══
│ ╭─────────────···
│ │ ✗ ᴏᴡɴᴇʀ : ${ownerName}
│ │ ✗ ᴜsᴇʀ : ${pushname ? pushname.replace(/[\r\n]+/gm, "") : 'User'}
│ │ ✗ ᴘʟᴜɢɪɴs : ${commands.length}
│ │ ✗ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
│ │ ✗ ᴍᴏᴅᴇ : ${mode}
│ │ ✗ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}
│ │ ✗ ʀᴀᴍ : ${formatBytes(os.totalmem() - os.freemem())} / ${formatBytes(os.totalmem())}
│ │ ✗ ᴠᴇʀsɪᴏɴ : ${version}
│ ╰─────────────···
╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══
`;

        for (const cat in commandslist) {
            msg += `\n╭───「 ${cat.toUpperCase()} 」\n`;
            for (const plugin of commandslist[cat]) {
                msg += `│ ➪ ${plugin}\n`;
            }
            msg += `╰──────────────\n`;
        }

        msg += `\n© ${botName}\n`;

        await conn.sendMessage(from, {
            image: { url: "https://tmpfiles.org/dl/wjwhcGcJC66H/image.jpg" },
            caption: msg
        }, { quoted: mek });
        
    } catch (e) {
        console.error("Failed to send menu:", e);
        reply("Error: " + e);
    }
});
