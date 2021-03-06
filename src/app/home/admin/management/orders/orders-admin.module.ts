import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-admin-routing.module';

import { OrdersAdminPage } from './orders-admin.page';

import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [OrdersAdminPage],
})
export class OrdersPageModule {}
