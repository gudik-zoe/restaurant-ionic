import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerServiceClientPageRoutingModule } from './customer-service-client-routing.module';

import { CustomerServiceClientPage } from './customer-service-client.page';
import { SharedComponentsModule } from 'src/app/shared/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    CustomerServiceClientPageRoutingModule,
  ],
  declarations: [CustomerServiceClientPage],
})
export class CustomerServiceClientPageModule {}
