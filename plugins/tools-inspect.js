// Código de Dev-fedexyz13 

const handler = async (m, { text, conn, command}) => {
  if (!text || typeof text!== 'string' ||!text.trim()) {
    return conn.reply(m.chat, '*🌴 Por favor ingresa el enlace del canal*.', m);
}

  const link = text.trim();
  const regex = /https?:\/\/whatsapp\.com\/channel\/([a-zA-Z0-9]+)/;

  const match = link.match(regex);
  if (!match ||!match[1]) {
    return conn.reply(m.chat, '*🌱 Enlace inválido*. *Asegúrate de que sea un enlace de canal de WhatsApp*.', m);
}

  const code = match[1];

  const simulatedId = BigInt('0x' + Buffer.from(code).toString('hex')).toString().slice(0, 18);
  const jid = `${simulatedId}@newsletter`;

  return conn.reply(m.chat, `✅ *JID del canal extraído:*\n\n\`${jid}\``, m);
};

handler.help = ['inspect <link del canal>'];
handler.tags = ['tools'];
handler.command = ['inspect'];

export default handler;
