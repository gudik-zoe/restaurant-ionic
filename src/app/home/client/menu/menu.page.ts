/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/shared/item/items.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(private itemsService: ItemsService) {}
  items: any;
  appetizers: Item[] = [];
  combos: Item[] = [];
  drinks: Item[] = [];
  desserts: Item[] = [];

  categories = [
    {
      title: 'appetizers',
    },
    {
      title: 'combos',
    },
    {
      title: 'drinks',
    },
    {
      title: 'desserts',
    },
  ];
  async getItems() {
    try {
      this.items = await this.itemsService.getAllItems();
      for (let item of this.items.result) {
        console.log(item.category);
        switch (item.category) {
          case 'Appetizer':
            this.appetizers.push(item);
            break;
          case 'Menu':
            this.combos.push(item);
            break;
          case 'Drink':
            this.drinks.push(item);
            break;
          case 'Dessert':
            this.desserts.push(item);
            break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  ngOnInit() {
    this.getItems();
  }
}
