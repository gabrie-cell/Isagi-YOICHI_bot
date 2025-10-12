//Código creado por JonathanG, dejen creditos hdp >:v

const menuVideos = [
    'https://files.catbox.moe/vbtn8h.mp4',
    'https://files.catbox.moe/k8llsk.mp4',
    'https://files.catbox.moe/g26rhu.mp4'
]; 

// --- --- --- --- --- --- --- --- --- --- -

// Función auxiliar para el tiempo de actividad 
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    // return [d, 'd ', h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('') // Formato con días
     return [h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join(''); // Formato horas, minutos, segundos
}


let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId]; 
    let name = conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length; 
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length; 

    let botSettings = global.db.data.settings[conn.user.jid] || {};


    let txt = `
¡Hola ${name} Me llamo  ${botname} 

╭━━ INFO - BOT ━ 
┃Tiempo activo: ${uptime}
┃Registros ${totalreg}
┃Comandos ${totalCommands}
┃✦ Te invitamos a seguirnos👻✨: https://whatsapp.com/channel/0029Vb6nOKBD8SDp0aFtCD3R
╰━━━━━━━━━━━━━

👻Quieres ser un sub bot?✨
Utiliza *#qr* ó *#code* Créditos a 
Jonathangg✨

✰ Lista de comandos:👻

╭─⬣「 ✰DESCARGAS✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#play + <texto>
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#tiktok + <url>
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│
╰─⬣


╭─⬣「 ✰BUSQUEDAS✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
╰─⬣

╭─⬣「 ✰CONFIGURACIÓN✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
╰─⬣

╭─⬣「 ✰GRUPOS✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#welcome
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
╰─⬣

╭─⬣「 ✰TOOLS✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
╰─⬣
╭─⬣「 ✰CREADOR✰ 」⬣
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#update
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
│⁖ฺ۟̇࣪·֗٬̤⃟⚡#
╰─⬣

> © Powered by Staff ISAGI Bot
`.trim();
let bot = global.db.data.settings[conn.user.jid]
    // --- Lógica para elegir aleatoriamente entre video/gif o imagen ---
    const useVideo = Math.random() < 0.4; // 40% de probabilidad de usar video/gif
    let messageOptions = {};
    let selectedMediaUrl;

    if (useVideo && menuVideos.length > 0) {
        // --- Preparar mensaje con Video/GIF ---
        selectedMediaUrl = menuVideos[Math.floor(Math.random() * menuVideos.length)];
        messageOptions = {
            video: { url: selectedMediaUrl },
            gifPlayback: true, // Permite que los GIF se reproduzcan automáticamente
            caption: txt,
            mentions: [m.sender, userId] // Menciona a los usuarios relevantes
        };
    } else if (menuImages.length > 0) {
        selectedMediaUrl = menuImages[Math.floor(Math.random() * menuImages.length)];
        messageOptions = {
            text: txt,
            contextInfo: {
                mentionedJid: [m.sender, userId],
                isForwarded: false, 
               forwardedNewsletterMessageInfo: { 
                   newsletterJid: channelRD.id,
                   newsletterName: channelRD.name,
                   serverMessageId: -1, 
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: botname, 
                    body: textbot, 
                    thumbnailUrl: selectedMediaUrl, 
                    sourceUrl: redes,
                    mediaType: 1, 
                    showAdAttribution: false, 
                    renderLargerThumbnail: true 
                }
            }
        };
    } else {
        // --- Fallback: Si no hay videos ni imágenes, enviar solo texto ---
        messageOptions = {
            text: txt,
            mentions: [m.sender, userId]
        };
        console.warn("Advertencia: No se encontraron URLs en menuVideos ni menuImages. Enviando solo texto.");
    }

    // --- Enviar el mensaje ---
    try {
        await conn.sendMessage(m.chat, messageOptions, { quoted: m }); // Envía citando el mensaje original
    } catch (error) {
        console.error("Error al enviar el mensaje del menú:", error);
        // Enviar un mensaje de error simple si falla el envío complejo
        await conn.reply(m.chat, `Error al mostrar el menú. \n\n${txt}`, m);
    }
};


handler.help = ['menu']; 
handler.tags = ['main'];
handler.command =  ['menu', 'menú', 'help']; 


export default handler;
