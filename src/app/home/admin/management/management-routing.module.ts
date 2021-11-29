import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagementPage } from './management.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementPage,
    children: [
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders-admin.module').then(
            (m) => m.OrdersPageModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementPageRoutingModule {}
