import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerServiceAdminPageRoutingModule } from './customer-service-admin-routing.module';

import { CustomerServiceAdminPage } from './customer-service-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerServiceAdminPageRoutingModule
  ],
  declarations: [CustomerServiceAdminPage]
})
export class CustomerServiceAdminPageModule {}
