import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { IonicModule } from '@ionic/angular';

import { BluePageRoutingModule } from './blue-routing.module';

import { BluePage } from './blue.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, BluePageRoutingModule],
  declarations: [BluePage],
  providers: [BluetoothLE],
})
export class BluePageModule {}
