import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [HeaderComponent, ItemComponent],
  imports: [CommonModule, IonicModule],
  exports: [HeaderComponent, ItemComponent],
})
export class SharedComponentsModule {}
