import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerServiceClientPage } from './customer-service-client.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerServiceClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServiceClientPageRoutingModule {}
