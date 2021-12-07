import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../admin.guard';

import { ManagementPage } from './management.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementPage,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders-admin.module').then(
            (m) => m.OrdersPageModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuPageModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementPageRoutingModule {}
