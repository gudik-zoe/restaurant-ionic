import { Component, OnInit } from '@angular/core';
import { AppetizersService } from './appetizers.service';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.page.html',
  styleUrls: ['./appetizers.page.scss'],
})
export class AppetizersPage implements OnInit {
  constructor(private appeitzersService: AppetizersService) {}

  ngOnInit() {
    this.appeitzersService.getAppetizers().subscribe((data) => {
      console.log(data);
    });
  }
}
