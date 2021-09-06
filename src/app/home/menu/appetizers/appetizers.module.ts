import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppetizersPageRoutingModule } from './appetizers-routing.module';

import { AppetizersPage } from './appetizers.page';
import { SharedComponentsModule } from 'src/app/sharedComponents/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppetizersPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [AppetizersPage],
})
export class AppetizersPageModule {}
