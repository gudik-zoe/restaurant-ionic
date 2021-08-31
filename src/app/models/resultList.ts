import { Item } from './item';

export class ResultList {
  public total: number;
  public start: number;
  public limit: number;
  public result: Item[];
}
