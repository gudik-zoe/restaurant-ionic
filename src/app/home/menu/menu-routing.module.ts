import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
  },
  {
    path: 'appetizers',
    loadChildren: () =>
      import('../menu/appetizers/appetizers.module').then(
        (m) => m.AppetizersPageModule
      ),
  },
  {
    path: 'combos',
    loadChildren: () =>
      import('../menu/combos/combos.module').then((m) => m.CombosPageModule),
  },
  {
    path: 'drinks',
    loadChildren: () =>
      import('../menu/drinks/drinks.module').then((m) => m.DrinksPageModule),
  },
  {
    path: 'desserts',
    loadChildren: () =>
      import('../menu/desserts/desserts.module').then(
        (m) => m.DessertsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
