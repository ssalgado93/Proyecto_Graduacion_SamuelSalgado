import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { NavigationLayoutComponent } from "./layouts/navigation-layout/navigation-layout.component";



const routes: Routes = [
  {
    path: "",
    component: DefaultLayoutComponent,
    children: [
      {
        path: "inicio",
        loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
      },
      {
        path: "inicio/login",
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: "inicio/registro",
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: "home/terminosycondiciones",
        loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
      },
      {
        path: "home/register/terminosycondiciones",
        loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
      },
      {
        path: "inicio/login/terminosycondiciones",
        loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule)
      },
      {
        path: "inicio/login/credenciales",
        loadChildren: () => import('./credential-recovery/credential-recovery.module').then(m => m.CredentialRecoveryModule)
      },
      {
        path: "navegacionProductos",
        loadChildren: () => import('./navigation-products/navigation-products.module').then(m => m.NavigationProductsModule)
      },
      {
        path: "",
        redirectTo: "inicio",
        pathMatch: "full"
      }
    ]
  },
  {
    path:"plazitanet",
    component: NavigationLayoutComponent,
    children:[
      {
        path: "navegacionProductos",
        loadChildren: () => import('./navigation-products/navigation-products.module').then(m => m.NavigationProductsModule)
      },
      {
        path: "",
        redirectTo: "plazitanet",
        pathMatch: "full"
      }
    ]
  },
  { path: 'administrador', loadChildren: () => import('./administrador/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
