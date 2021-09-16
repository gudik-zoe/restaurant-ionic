import { CardItem } from './cardItem';
import { Item } from './item';

export class Order {
  public userId!: string;
  public items!: CardItem[];
}
