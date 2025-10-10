// Código de Dev-fedexyz13


import { execSync} from 'child_process';

const handler = async (m, { conn, text, isROwner}) => {
  if (!isROwner) return;

  await m.react('🕒'); 

  try {
    const stdout = execSync('git pull' + (m.fromMe && text? ' ' + text: ''));
    let output = stdout.toString();

    if (output.includes('⚙ Ya está cargada la actualización.')) {
      output = '✅ Los datos ya están actualizados a la última versión.';
} else if (output.includes('👻 Actualizando.')) {
      output = '🔄 Procesando actualización...\n\n' + output;
}

    await m.react('✔️'); 
    conn.reply(m.chat, output, m);

} catch {
    try {
      const status = execSync('git status --porcelain');
      if (status.length> 0) {
        const conflictedFiles = status
.toString()
.split('\n')
.filter(line => line.trim()!== '')
.map(line => {
            const ignoredPaths = [
              '.npm/', '.cache/', 'tmp/',
              'database.json', 'sessions/Principal/',
              'npm-debug.log'
            ];
            return ignoredPaths.some(path => line.includes(path))? null: `*→ ${line.slice(3)}*`;
})
.filter(Boolean);

        if (conflictedFiles.length> 0) {
          const errorMsg = `⚠️ *Actualización fallida:*\n\n> Se detectaron cambios locales que entran en conflicto con el repositorio remoto.\n\n${conflictedFiles.join('\n')}`;
          await conn.reply(m.chat, errorMsg, m);
          await m.react('✖️');
}
}
} catch (error) {
      console.error(error);
      let fallbackMsg = '⚠️ Se produjo un error inesperado.';
      if (error.message) fallbackMsg += `\n🧩 Detalles: ${error.message}`;
      await conn.reply(m.chat, fallbackMsg, m);
}
}
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'fix', 'actualizar'];
handler.owner = true;

export default handler;
