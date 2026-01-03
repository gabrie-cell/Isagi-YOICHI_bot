import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  if (who === conn.user.jid) return m.react('✖️')
  if (!(who in global.db.data.users)) return m.reply(`❌ Usuario no encontrado en la base de datos.`)

  let user = global.db.data.users[who]
  let total = (user.coin || 0) + (user.bank || 0)
  let name = await conn.getName(who)

  const texto = 
`📊 *ECONOMÍA DEL USUARIO*

👤 *Usuario:* ${name}
💰 *Dinero en mano:* ${user.coin || 0} ${moneda}
🏦 *Dinero en banco:* ${user.bank || 0} ${moneda}
🔗 *Total acumulado:* ${total} ${moneda}

⚠️ Usa *${usedPrefix}deposit* para proteger tu dinero.`

  await conn.reply(m.chat, texto, m)
}

handler.help = ['bal']
handler.tags = ['economía']
handler.command = ['bal', 'balance', 'bank']
handler.register = false
handler.group = false 

export default handler