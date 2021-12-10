import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerServiceAdminPageRoutingModule } from './customer-service-admin-routing.module';

import { CustomerServiceAdminPage } from './customer-service-admin.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerServiceAdminPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [CustomerServiceAdminPage],
})
export class CustomerServiceAdminPageModule {}
