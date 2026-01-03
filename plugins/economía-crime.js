let cooldowns = {}

let handler = async (m, { conn }) => {
  let users = global.db.data.users
  let senderId = m.sender

  const COOLDOWN = 5 * 60 * 1000
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < COOLDOWN) {
    let tiempoRest = Math.ceil((cooldowns[senderId] + COOLDOWN - Date.now()) / 1000)
    return m.reply(`⏳ Espera *${segundosAHMS(tiempoRest)}* antes de volver a intentar.`, null, { ...global.rcanal })
  }
  cooldowns[senderId] = Date.now()

  if (!users[senderId]) return m.reply('⚠️ No estás registrado.', null, { ...global.rcanal })
  let senderCoin = users[senderId].coin || 0

  let posiblesVictimas = Object.entries(users).filter(([id]) => id !== senderId && (users[id].coin || 0) > 0)
  if (!posiblesVictimas.length) return m.reply('⚠️ No hay víctimas con dinero.', null, { ...global.rcanal })

  let [victimId, victimData] = posiblesVictimas[Math.floor(Math.random() * posiblesVictimas.length)]
  let victimCoin = victimData.coin || 0

  const minAmount = 15
  const maxAmount = 50

  const randAmount = (min, max, maxAllowed) => {
    let amount = Math.floor(Math.random() * (max - min + 1)) + min
    return Math.min(amount, maxAllowed)
  }

  const frases = {
    exito: [
      `💥 Atracaste a @${victimId.split('@')[0]} y te hiciste con *{amount} ${moneda}*.`,
      `⚔️ Robaste con maña a @${victimId.split('@')[0]} y le quitaste *{amount} ${moneda}*.`,
      `🎯 Golpe perfecto a @${victimId.split('@')[0]}, le sacaste *{amount} ${moneda}*.`,
      `🔥 Te pelaste con *{amount} ${moneda}* tras robar a @${victimId.split('@')[0]}.`,
      `👊 Asalto express a @${victimId.split('@')[0]}, ganancia de *{amount} ${moneda}*.`,
      `💣 Dejaste a @${victimId.split('@')[0]} sin billete y con la cara rota, agarraste *{amount} ${moneda}*.`,
      `🕶️ Operación relámpago, robaste *{amount} ${moneda}* a @${victimId.split('@')[0]} sin que se diera cuenta.`,
      `🎭 Con disfraz y todo, le quitaste *{amount} ${moneda}* a @${victimId.split('@')[0]}.`,
      `🚀 Rápido y furioso, te fuiste con *{amount} ${moneda}* de @${victimId.split('@')[0]}.`
    ],
    atrapado: [
      `🚔 La poli te cazó y perdiste *{amount} ${moneda}*.`,
      `🛑 Te agarraron en plena faena y te sacaron *{amount} ${moneda}*.`,
      `⛓️ Cárcel express, te quitaron *{amount} ${moneda}*.`,
      `👮‍♂️ Los tombos te hicieron la limpia y perdiste *{amount} ${moneda}*.`,
      `⚡ Te pillaron y saliste sin *{amount} ${moneda}*.`,
      `🧱 Te encajonaron y encima te bajaron *{amount} ${moneda}*.`,
      `💥 Caíste en la trampa y perdiste *{amount} ${moneda}* a manos de la ley.`,
      `🥵 Te dieron hasta con la chancla y sin billete, perdiste *{amount} ${moneda}*.`,
      `📉 Tu suerte se acabó, la poli te dejó sin *{amount} ${moneda}*.`
    ],
    semi: [
      `🤏 Lograste robar *{amount} ${moneda}* a @${victimId.split('@')[0]}, pero casi te atrapan.`,
      `💨 Te escapaste con *{amount} ${moneda}* tras un robo medio chueco a @${victimId.split('@')[0]}.`,
      `😅 Robo a medias, te quedaste con *{amount} ${moneda}* de @${victimId.split('@')[0]}.`,
      `⚡ Hiciste lo que pudiste y agarraste *{amount} ${moneda}* de @${victimId.split('@')[0]}.`,
      `🕵️‍♂️ Fuiste medio ninja y sacaste *{amount} ${moneda}* de @${victimId.split('@')[0]}, pero te vieron.`,
      `🤫 Robaste calladito y rápido *{amount} ${moneda}*, pero alguien te pilló.`,
      `🎲 El robo salió casi bien, te fuiste con *{amount} ${moneda}* pero con susto.`,
      `⚔️ A medias lograste el robo y te quedaste con *{amount} ${moneda}*.`
    ]
  }

  let outcome = Math.floor(Math.random() * 3)

  switch (outcome) {
    case 0: {
      let stolen = randAmount(minAmount, maxAmount, victimCoin)
      users[senderId].coin = senderCoin + stolen
      users[victimId].coin = victimCoin - stolen
      let text = frases.exito[Math.floor(Math.random() * frases.exito.length)].replace('{amount}', stolen)
      await conn.sendMessage(m.chat, { text, contextInfo: { mentionedJid: [victimId], ...global.rcanal } }, { quoted: m })
      break
    }
    case 1: {
      let lost = randAmount(minAmount, maxAmount, senderCoin)
      users[senderId].coin = senderCoin - lost
      let text = frases.atrapado[Math.floor(Math.random() * frases.atrapado.length)].replace('{amount}', lost)
      await conn.sendMessage(m.chat, { text, contextInfo: { ...global.rcanal } }, { quoted: m })
      break
    }
    case 2: {
      let stolen = randAmount(minAmount, maxAmount, Math.floor(victimCoin / 2))
      users[senderId].coin = senderCoin + stolen
      users[victimId].coin = victimCoin - stolen
      let text = frases.semi[Math.floor(Math.random() * frases.semi.length)].replace('{amount}', stolen)
      await conn.sendMessage(m.chat, { text, contextInfo: { mentionedJid: [victimId], ...global.rcanal } }, { quoted: m })
      break
    }
  }

  global.db.write()
}

handler.tags = ['eco']
handler.help = ['crime']
handler.command = ['crimen', 'crime']
handler.register = false
handler.group = false

export default handler

function segundosAHMS(seg) {
  let m = Math.floor(seg / 60)
  let s = seg % 60
  return `${m} minutos y ${s} segundos`
}