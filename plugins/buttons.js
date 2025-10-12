/*Código de propiedad de Dev-fedexyz13 
 No quites los créditos puto 👻*/

// @type {import('@whiskeysockets/baileys')}
const { proto, generateWAMessage, areJidsSameUser} = (await import('@whiskeysockets/baileys')).default;

export async function all(m, chatUpdate) {
  try {
    if (m.isBaileys ||!m.message) return;

    const msgTypes = [
      'buttonsResponseMessage',
      'templateButtonReplyMessage',
      'listResponseMessage',
      'interactiveResponseMessage'
    ];

    const hasInteractiveMsg = msgTypes.some(type => m.message[type]);
    if (!hasInteractiveMsg) return;

    let id =
      m.message.buttonsResponseMessage?.selectedButtonId ||
      m.message.templateButtonReplyMessage?.selectedId ||
      m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
      JSON.parse(m.message.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson || '{}')?.id;

    const text =
      m.message.buttonsResponseMessage?.selectedDisplayText ||
      m.message.templateButtonReplyMessage?.selectedDisplayText ||
      m.message.listResponseMessage?.title ||
      m.message.interactiveResponseMessage?.body?.text;

    let isIdMessage = false;
    let usedPrefix;

    for (const name in global.plugins) {
      const plugin = global.plugins[name];
      if (!plugin || plugin.disabled || typeof plugin!== 'function' ||!plugin.command) continue;

      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue;

      const escapeRegex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
      const prefix = plugin.customPrefix || this.prefix || global.prefix;

      const match = (
        prefix instanceof RegExp
? [[prefix.exec(id), prefix]]
: Array.isArray(prefix)
? prefix.map(p => {
              const re = p instanceof RegExp? p: new RegExp(escapeRegex(p));
              return [re.exec(id), re];
})
: typeof prefix === 'string'
? [[new RegExp(escapeRegex(prefix)).exec(id), new RegExp(escapeRegex(prefix))]]
: [[[], new RegExp]]
).find(p => p[1]);

      if ((usedPrefix = (match?.[0] || '')[0])) {
        const noPrefix = id.replace(usedPrefix, '');
        let [command] = noPrefix.trim().split(/\s+/);
        command = (command || '').toLowerCase();

        const isMatch =
          plugin.command instanceof RegExp
? plugin.command.test(command)
: Array.isArray(plugin.command)
? plugin.command.some(cmd =>
                cmd instanceof RegExp? cmd.test(command): cmd === command
)
: typeof plugin.command === 'string'
? plugin.command === command
: false;

        if (isMatch) isIdMessage = true;
}
}

    const messages = await generateWAMessage(
      m.chat,
      { text: isIdMessage? id: text, mentions: m.mentionedJid},
      {
        userJid: this.user.id,
        quoted: m.quoted?.fakeObj
}
);

    messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
    messages.key.id = m.key.id;
    messages.pushName = m.name;

    if (m.isGroup) {
      messages.key.participant = messages.participant = m.sender;
}

    const msg = {
...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(messages)].map(v => ((v.conn = this), v)),
      type: 'append'
};

    this.ev.emit('messages.upsert', msg);
} catch (error) {
    console.error('[Baileys Handler Error]', error);
}
}
