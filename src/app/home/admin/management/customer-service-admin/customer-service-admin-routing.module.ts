import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerServiceAdminPage } from './customer-service-admin.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerServiceAdminPage
  },
  {
    path: ':roomId',
    loadChildren: () => import('./room/room.module').then(m => m.RoomPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServiceAdminPageRoutingModule { }
