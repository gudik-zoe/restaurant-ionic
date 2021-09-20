import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';
import { SharedComponentsModule } from 'src/app/sharedComponents/shared-components.module';
import { OrderModalComponent } from './order-modal/order-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [OrderPage, OrderModalComponent],
})
export class OrderPageModule {}
