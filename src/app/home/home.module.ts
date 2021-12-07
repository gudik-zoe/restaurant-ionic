import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedComponentsModule } from '../shared/shared-components.module';
import { AdminGuard } from './admin/admin.guard';
import { ClientGuard } from './client.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedComponentsModule,
    SuperTabsModule.forRoot(),
  ],
  declarations: [HomePage],
  providers: [AdminGuard, ClientGuard],
})
export class HomePageModule {}
