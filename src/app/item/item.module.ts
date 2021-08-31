import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [ItemComponent],
})
export class ItemModule {}
