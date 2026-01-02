const menuSections = { 
  '✦ *DESCARGAS* ✦': [ 
    '#facebook + <url>', 
    '#play + <texto>', 
    '#tiktok + <url>', 
    '#ig + <url>', 
  ], 
};

const PREFIX_SYMBOL = '🌱';

function clockString(ms) {
  if (isNaN(ms)) return '--:--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600) % 24;
  const m = Math.floor(totalSeconds / 60) % 60;
  const s = totalSeconds % 60;
  const pad = (num) => String(num).padStart(2, '0');
  return `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

function buildMenuText({ name, botname, uptime, totalreg, totalCommands }) {
  const sectionsText = Object.entries(menuSections)
    .map(([title, commands]) => {
      const commandsList = commands
        .map(cmd => `┃ ${PREFIX_SYMBOL}${cmd}`)
        .join('\n');
      return `
╭───⬣「 ${title} 」⬣
${commandsList}
╰───⬣`;
    })
    .join('\n\n');

  return `
*¡Hola ${name}! Soy ${botname}*
╭━━━┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ *INFO DEL BOT*
┃ 👑 *Activo:* ${uptime}
┃ 👥 *Usuarios:* ${totalreg}
┃ 📚 *Comandos:* ${totalCommands}
┃ 📣 *Canal:* 🎅🏻FELIS NAVIDAD Y PRÓSPERO AÑO NUEVO
┃ https:                                               
╰━━━┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
¿*Quieres ser un sub bot? Utiliza *#code*
✦ Lista de comandos:

${sectionsText}

> © POWERED BY DX G😼
`//whatsapp.com/channel/0029Vb6nOKBD8SDp0aFtCD3R
╰━━━┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
¿*Quieres ser un sub bot? Utiliza *#code*
✦ Lista de comandos:

${sectionsText}

> © POWERED BY DX G😼
`.trim();
}

let handler = async (m, { conn }) => {
  const userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
  const name = conn.getName(userId);
  const _uptime = process.uptime() * 1000;
  const metrics = {
    name: name,
    botname: global.botname || 'Isagi Bot',
    uptime: clockString(_uptime),
    totalreg: Object.keys(global.db?.data?.users || {}).length,
    totalCommands: Object.values(global.plugins || {}).filter((v) => v.help && v.tags).length,
  };
  const menuText = buildMenuText(metrics);
  const videoUrl = 'https:                               
  await conn.sendMessage(m.chat, {
    video: { url: videoUrl },
    gifPlayback: true,
    caption: menuText,
    contextInfo: {
      externalAdReply: {
        title: '//files.catbox.moe/oakq7t.mp4';
  await conn.sendMessage(m.chat, {
    video: { url: videoUrl },
    gifPlayback: true,
    caption: menuText,
    contextInfo: {
      externalAdReply: {
        title: 'Isagi - Bot',
        body: metrics.botname,
        thumbnailUrl: 'https://files.catbox.moe/6orur7.jpg',
        mediaType: 1,
      },
      mentionedJid: [m.sender, userId],
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.canalIdM?.[0] || '',
        newsletterName: 'Isagi - MD',
        serverMessageId: -1
      }
    }
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help'];
handler.register = true;
export default handler;