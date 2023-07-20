import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatPaginatorModule} from '@angular/material/paginator';
import { NavigationProductsRoutingModule } from './navigation-products-routing.module';
import { NavigationProductsComponent } from './vista-navegacion/navigation-products.component';
import { NewProductsComponent } from './nuevo-producto/new-products.component';
import { PublishedProductsComponent } from './productos-publicados/published-products.component';
import { WishListComponent } from './lista-deseos/wish-list.component';
import { ProductsComponent } from './productos/products.component';
import { ComponentsModule } from "../components/components.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubscriptionsComponent } from './subscripciones/subscriptions.component';
import { ComplaintComponent } from './quejas/complaint.component';
import { ViewProductsComponent } from './vista-productos/view-products.component';
import { ChatsComponent } from './chats/chats.component';

@NgModule({
  declarations: [
    NavigationProductsComponent,
    NewProductsComponent,
    PublishedProductsComponent,
    WishListComponent,
    ProductsComponent,
    SubscriptionsComponent,
    ViewProductsComponent,
    ComplaintComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    NavigationProductsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports:[
    NavigationProductsComponent
  ],
  providers:[
    CurrencyPipe
  ]
})
export class NavigationProductsModule { }
