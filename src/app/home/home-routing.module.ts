import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'menu',
        loadChildren: () =>
          import('./client/menu/menu.module').then((m) => m.MenuPageModule),
      },

      {
        path: 'card',
        loadChildren: () =>
          import('./client/card/card.module').then((m) => m.CardPageModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./client/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./client/order/order.module').then((m) => m.OrderPageModule),
        },
        {
          path: 'customer-service-client',
          loadChildren: () =>
            import(
              './client/customer-service-client/customer-service-client.module'
            ).then((m) => m.CustomerServiceClientPageModule),
        },
    ],
  },
  // {
  //   path: 'order',
  //   loadChildren: () =>
  //     import('./client/order/order.module').then((m) => m.OrderPageModule),
  // },
  // {
  //   path: 'blue',
  //   loadChildren: () =>
  //     import('./client/blue/blue.module').then((m) => m.BluePageModule),
  // },
  {
    path: 'management',
    loadChildren: () =>
      import('./admin/management/management.module').then(
        (m) => m.ManagementPageModule
      ),
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
