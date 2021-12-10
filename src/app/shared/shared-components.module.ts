import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from './item/item.component';
import { SelectItemComponent } from './item/select-item/select-item.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    ItemComponent,

    SelectItemComponent,
    OrdersComponent,
    OrderModalComponent,
    ChatComponent,
  ],
  imports: [CommonModule, IonicModule, FormsModule],
  exports: [
    HeaderComponent,
    ItemComponent,
    OrderModalComponent,
    OrdersComponent,
    ChatComponent,
  ],
})
export class SharedComponentsModule {}
