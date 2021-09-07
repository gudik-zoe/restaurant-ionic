import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home/menu',
    pathMatch: 'full',
  },
  // {
  //   path: 'menu',
  //   loadChildren: () =>
  //     import('./menu/menu.module').then((m) => m.MenuPageModule),
  // },

  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./menu/tabs/tabs.module').then( m => m.TabsPageModule)
  // },
  {
    path: 'card',
    loadChildren: () =>
      import('./card/card.module').then((m) => m.CardPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
