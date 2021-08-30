import { Component, OnInit } from '@angular/core';
import { DrinksService } from './drinks.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.page.html',
  styleUrls: ['./drinks.page.scss'],
})
export class DrinksPage implements OnInit {
  constructor(private drinkService: DrinksService) {}

  ngOnInit() {
    this.drinkService.getDrinks().subscribe((data) => {
      console.log(data);
    });
  }
}
