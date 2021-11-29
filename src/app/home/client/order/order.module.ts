import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { OrderModalClientComponent } from './order-modal-client/order-modal-client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [OrderPage, OrderModalClientComponent],
})
export class OrderPageModule {}
