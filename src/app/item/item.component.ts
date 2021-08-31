/* eslint-disable @typescript-eslint/member-ordering */
import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ResultList } from 'src/app/models/resultList';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  constructor(private itemsService: ItemsService) {}
  @Input() category: string;
  items: Item[];
  ngOnInit() {
    this.itemsService
      .getItemsByCategory(this.category)
      .subscribe((data: ResultList) => {
        this.items = data.result;
      });
  }
}
