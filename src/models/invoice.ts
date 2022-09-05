import { Item } from './item';

export interface Invoice {
  finalPrice: number;
  totalPrice: number;
  items: Item[];
}
