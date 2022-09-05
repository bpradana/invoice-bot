import { Service } from '@enitoni/gears-discordjs';
import { Invoice } from '../models/invoice';
import { Item } from '../models/item';

export class InvoiceService extends Service {
  private invoices: Record<string, Invoice> = {};

  public async getInvoice(channelId: string) {
    if (!this.invoices[channelId]) {
      return 'List is empty!';
    }
    const items: Item[] = this.invoices[channelId].items;
    const buyers: string[] = [...new Set(items.map((item) => item.buyer))];

    const totalPrice: number = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    this.invoices[channelId].totalPrice = totalPrice;

    const finalPrice: number =
      this.invoices[channelId].finalPrice || totalPrice;

    const content: string[] = buyers.map((buyer) => {
      const buyerItems: Item[] = items.filter((item) => item.buyer === buyer);
      const buyerTotal: number = buyerItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const buyerContent: string = buyerItems
        .map((item) => `    ${item.name} - ${item.price} x ${item.quantity}`)
        .join('\n');
      return `${buyer} - ${buyerTotal} -> ${
        (finalPrice / totalPrice) * buyerTotal
      }\n${buyerContent}`;
    });

    return `Final Price: ${finalPrice}\nTotal: ${totalPrice}\n${content.join(
      '\n'
    )}`;
  }

  public async addItem(channelId: string, content: string) {
    const [buyer, name, price, quantity] = content.split(';');
    const item: Item = {
      buyer,
      name,
      price: Number(price),
      quantity: Number(quantity),
    };

    if (!this.invoices[channelId]) {
      this.invoices[channelId] = {
        finalPrice: 0,
        totalPrice: 0,
        items: [],
      };
    }

    this.invoices[channelId].items.push(item);
  }

  public async listItem(channelId: string) {
    return this.invoices[channelId].items
      .map(
        (item, index) =>
          `${index + 1}. ${item.buyer} - ${item.name} - ${item.price} - ${
            item.quantity
          }`
      )
      .join('\n');
  }

  public async removeItem(channelId: string, content: string) {
    this.invoices[channelId].items.splice(Number(content) - 1, 1);
  }

  public async clearInvoice(channelId: string) {
    this.invoices[channelId] = {
      finalPrice: 0,
      totalPrice: 0,
      items: [],
    };
  }

  public async addFinalPrice(channelId: string, content: string) {
    this.invoices[channelId].finalPrice = Number(content);
  }
}
