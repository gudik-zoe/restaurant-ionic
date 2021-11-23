import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderModalComponent } from 'src/app/home/client/order/order-modal/order-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrdersPageRoutingModule],
  declarations: [OrdersPage, OrderModalComponent],
})
export class OrdersPageModule {}
