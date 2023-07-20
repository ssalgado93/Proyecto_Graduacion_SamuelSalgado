import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationProductsComponent } from './vista-navegacion/navigation-products.component';
import { ProductsComponent } from "./productos/products.component";
import { WishListComponent } from "./lista-deseos/wish-list.component";
import { PublishedProductsComponent } from "./productos-publicados/published-products.component";
import { SubscriptionsComponent } from './subscripciones/subscriptions.component';
import { ChatsComponent } from './chats/chats.component'
import { TermsAndConditionsComponent } from '../terms-and-conditions/view-terms/terms-and-conditions.component';

import { ViewProductsComponent } from './vista-productos/view-products.component';
const routes: Routes = [
  {
    path: '',
    component: NavigationProductsComponent,
    children:[
      {path: '',component:ProductsComponent},
      {path: 'listaDeseos',component:WishListComponent},
      {path: 'publicados',component:PublishedProductsComponent},
      {path: 'subscripciones',component:SubscriptionsComponent},
      {path: 'chats/:id',component:ChatsComponent},
      {path: 'chats',component:ChatsComponent},
      {path: 'vistaProductos',component:ViewProductsComponent},
      {path: 'publicados1',component:PublishedProductsComponent},
      {path: 'terminosycondiciones', component:TermsAndConditionsComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationProductsRoutingModule { }
