import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appetizers',
  templateUrl: './appetizers.page.html',
  styleUrls: ['./appetizers.page.scss'],
})
export class AppetizersPage implements OnInit {
  constructor(private router: Router) {}
  navigate() {
    console.log('hello appetizers');
    // this.router.navigate(['/menu']);
  }
  ngOnInit() {}
}
