import { matchAll, matchPrefixes } from '@enitoni/gears';
import { CommandBuilder, CommandGroupBuilder } from '@enitoni/gears-discordjs';
import { InvoiceService } from '../services/invoice';

const addCommand = new CommandBuilder()
  .match(matchPrefixes('a'))
  .use(async (context) => {
    const { message, manager, content } = context;
    const service = manager.getService(InvoiceService);

    await service.addItem(message.channel.id, content);
    return message.channel.send('Item added!');
  })
  .done();

const removeCommand = new CommandBuilder()
  .match(matchPrefixes('r'))
  .use(async (context) => {
    const { message, manager, content } = context;
    const service = manager.getService(InvoiceService);

    await service.removeItem(message.channel.id, content);
    return message.channel.send('Item removed!');
  })
  .done();

const finalPriceCommand = new CommandBuilder()
  .match(matchPrefixes('fp'))
  .use(async (context) => {
    const { message, manager, content } = context;
    const service = manager.getService(InvoiceService);

    await service.addFinalPrice(message.channel.id, content);
    return message.channel.send('Final price set!');
  })
  .done();

const listCommand = new CommandBuilder()
  .match(matchPrefixes('l'))
  .use(async (context) => {
    const { message, manager } = context;
    const service = manager.getService(InvoiceService);

    const list = await service.listItem(message.channel.id);
    return message.channel.send(list);
  })
  .done();

const getCommand = new CommandBuilder()
  .match(matchAll())
  .use(async (context) => {
    const { message, manager } = context;
    const service = manager.getService(InvoiceService);

    const content: string = await service.getInvoice(message.channel.id);
    return message.channel.send(content);
  })
  .done();

const clearCommand = new CommandBuilder()
  .match(matchPrefixes('c'))
  .use(async (context) => {
    const { message, manager } = context;
    const service = manager.getService(InvoiceService);

    await service.clearInvoice(message.channel.id);
    return message.channel.send('List cleared!');
  })
  .done();

export const invoiceGroup = new CommandGroupBuilder()
  .match(matchPrefixes('!inv'))
  .setCommands(
    addCommand,
    removeCommand,
    finalPriceCommand,
    listCommand,
    clearCommand,
    getCommand
  )
  .done();
