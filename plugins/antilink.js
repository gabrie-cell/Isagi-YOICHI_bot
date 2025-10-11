const handler = async (m, { conn}) => {

  if (!m.isGroup) return;

  if (!m.text) return;

  const linkRegex = /(https?:\/\/|www\.|chat\.whatsapp\.com\/|whatsapp\.com\/channel\/|t\.me\/|discord\.gg\/|instagram\.com\/|facebook\.com\/|youtube\.com\/|youtu\.be\/)/i;

  if (linkRegex.test(m.text)) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key});
} catch (e) {
      console.error('❌ Error al eliminar mensaje con link:', e);
}
}
};

handler.all = handler;
handler.tags = ['moderation'];
handler.command = [];
handler.group = true;

export default handler;
