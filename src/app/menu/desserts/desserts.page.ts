import { Component, OnInit } from '@angular/core';
import { DessertsService } from './desserts.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.page.html',
  styleUrls: ['./desserts.page.scss'],
})
export class DessertsPage implements OnInit {
  constructor(private dessertsService: DessertsService) {}

  ngOnInit() {
    this.dessertsService.getDesserts().subscribe((data) => {
      console.log(data);
    });
  }
}
