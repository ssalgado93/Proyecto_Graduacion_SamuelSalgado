import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsComponent } from './quejas/complaints.component';
import { CategoriesComponent } from './categorias/categories.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { bitacoraComponent } from './Bitacora/bitacora.component';
import { ExpiryTimeComponent } from './fecha-expiracion/expiry-time.component';
import { StatisticsComponent } from './estadisticas/statistics.component';
import { AdminComponent } from './vistasadmin/admin.component';
import { VigilanteGuard } from './vigilante.guard';


const routes: Routes = [{ path: '', component: AdminComponent, canActivate: [VigilanteGuard],
children:[
  {path: '',component:CategoriesComponent},
  {path: 'bitacora',component:bitacoraComponent},
  {path: 'usuarios',component:UsuariosComponent},
  {path: 'quejas',component:ComplaintsComponent},
  {path: 'fechaexpiracion',component:ExpiryTimeComponent},
  {path: 'estadisticas',component:StatisticsComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }