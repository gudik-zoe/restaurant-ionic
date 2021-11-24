import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';

import { SharedComponentsModule } from 'src/app/shared/shared-components.module';
import { OrderModalComponent } from './order-modal/order-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, OrdersPageRoutingModule , SharedComponentsModule,],
  declarations: [OrdersPage, OrderModalComponent],
})
export class OrdersPageModule {}
