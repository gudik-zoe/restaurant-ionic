import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CombosPageRoutingModule } from './combos-routing.module';

import { CombosPage } from './combos.page';
import { SharedComponentsModule } from 'src/app/sharedComponents/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CombosPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [CombosPage],
})
export class CombosPageModule {}
