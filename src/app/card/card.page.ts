/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  constructor() {}
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  ngOnInit() {}
}
