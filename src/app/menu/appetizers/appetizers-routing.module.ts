import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppetizersPage } from './appetizers.page';

const routes: Routes = [
  {
    path: '',
    component: AppetizersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppetizersPageRoutingModule {}
