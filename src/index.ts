import { Bot } from '@enitoni/gears';
import { Adapter } from '@enitoni/gears-discordjs';
import { Client, Message } from 'discord.js';
import { adapterOptions } from './utils/config';

import { invoiceGroup } from './commands/invoice';
import { InvoiceService } from './services/invoice';

const adapter: Adapter = new Adapter(adapterOptions);
const bot: Bot<Message, Client> = new Bot({
  adapter,
  commands: [invoiceGroup],
  services: [InvoiceService],
});

async function main() {
  await bot.start();
  console.log('Bot is running!');
}

main();
