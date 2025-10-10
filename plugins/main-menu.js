
import moment from 'moment-timezone'
import os from 'os'

let handler = async (m, { conn, usedPrefix: _p }) => {
  let name = await conn.getName(m.sender)
  let user = global.db.data.users[m.sender]
  let uptime = clockString(process.uptime() * 1000)
  let totalGroup = Object.values(conn.chats).filter(v => v.id.endsWith('.net') && v.isGroup).length

  let info = `
Hola, ${name}
Soy isagi, listo para ayudarte.

*乂 Información del Usuario*
┌  ◦ *Estado:* ${user.premiumTime > 0 ? '👑 Premium' : 'Usuario'}
└  ◦ *Límite:* ${user.limit}

*乂 Información del Bot*
┌  ◦ *Grupos:* ${totalGroup}
│  ◦ *Tiempo activo:* ${uptime}
└  ◦ *Plataforma:* ${os.platform()}

Si encuentras algún error, por favor contacta al propietario.
`.trim()

  let help = Object.values(global.plugins).filter(p => !p.disabled).map(plugin => {
    return {
      help: Array.isArray(plugin.help)
        ? plugin.help
        : typeof plugin.help === 'string'
          ? [plugin.help]
          : [],
      tags: Array.isArray(plugin.tags)
        ? plugin.tags
        : typeof plugin.tags === 'string'
          ? [plugin.tags]
          : []
    }
  })

  let tagSet = new Set()
  for (let plugin of help)
    for (let tag of plugin.tags)
      tagSet.add(tag)

  const stylize = s => s.toLowerCase().replace(/[a-z]/g, c => {
    return {
      a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ',
      h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ',
      o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ',
      v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
    }[c] || c
  })

  let menuText = [...tagSet].map(tag => {
    let cmds = help
      .filter(p => p.tags.includes(tag))
      .flatMap(p => p.help)
      .map(cmd => typeof cmd === 'string' ? `│  ◦ ${_p}${cmd.toLowerCase()}` : null)
      .filter(Boolean)

    if (!cmds.length) return null
    return `*– Menú ${stylize(tag)}*\n${cmds.join('\n')}\n└––`
  }).filter(Boolean).join('\n\n')

  await conn.sendMessage(m.chat, {
    image: { url: '.
https://cdn.yupra.my.id/yp/unyy5qaq.jpg' },
    caption: info + '\n\n' + menuText
  }, { quoted: m })

await conn.sendMessage(m.chat, {
    audio: { url: 'https://cdn.yupra.my.id/yp/okibzvte.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m })
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu','help','menú','allmenu','menucompleto']
handler.exp = false

export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, 'H', m, 'M', s, 'S'].join(' ')
}