import { CardItem } from './cardItem';
import { Item } from './item';

export class Order {
  public _id: string;
  public userId!: string;
  public items!: CardItem[];
  public total!: number;
  public status!: string;
}
