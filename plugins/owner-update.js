// Código de Dev-fedexyz13

import { exec} from 'child_process';

const handler = async (m, { conn, command}) => {
  const isOwner = global.owner.includes(m.sender);
  if (!isOwner) return m.reply('🚫 *_Este comando solo puede ser usado por el owner._*');

  m.reply('⚙ *_Ejecutando actualización del bot..._*');

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      conn.reply(m.chat, `❌ Error al actualizar:\n${stderr}`, m);
} else {
      conn.reply(m.chat, `✅ Bot actualizado correctamente:\n${stdout}`, m);
}
});
};

handler.command = ['update', 'fix', 'up'];
handler.owner = true;
handler.group = false;

export default handler;
