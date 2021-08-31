import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrinksPageRoutingModule } from './drinks-routing.module';

import { DrinksPage } from './drinks.page';
import { ItemModule } from 'src/app/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinksPageRoutingModule,
    ItemModule,
  ],
  declarations: [DrinksPage],
})
export class DrinksPageModule {}
