import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppetizersPageRoutingModule } from './appetizers-routing.module';

import { AppetizersPage } from './appetizers.page';
import { ItemModule } from 'src/app/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppetizersPageRoutingModule,
    ItemModule,
  ],
  declarations: [AppetizersPage],
})
export class AppetizersPageModule {}
