import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { MenuPage } from './menu.page';
import { SharedComponentsModule } from 'src/app/sharedComponents/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    SharedComponentsModule,
    SuperTabsModule.forRoot(),
  ],
  declarations: [MenuPage],
})
export class MenuPageModule {}
