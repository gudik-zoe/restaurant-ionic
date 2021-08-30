import { Component, OnInit } from '@angular/core';
import { CombosService } from './combos.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.page.html',
  styleUrls: ['./combos.page.scss'],
})
export class CombosPage implements OnInit {
  constructor(private combosService: CombosService) {}

  ngOnInit() {
    this.combosService.getCombos().subscribe((data) => {
      console.log(data);
    });
  }
}
