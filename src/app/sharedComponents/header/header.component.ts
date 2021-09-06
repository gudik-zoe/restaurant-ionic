/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() defaultHref: string = '';
  constructor() {}
  stamp() {
    console.log(this.defaultHref + ' ' + this.title);
  }
  ngOnInit() {
    console.log(this.title + ' ' + this.defaultHref);
  }
}
