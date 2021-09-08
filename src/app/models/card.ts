import { CardItem } from './cardItem';
import { Item } from './item';

export class Card {
  public _id?: string;
  public items: CardItem[];
  public total: number;
}
