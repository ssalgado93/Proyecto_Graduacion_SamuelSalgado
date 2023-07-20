import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module'
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './vistasadmin/admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { StatisticsComponent } from './estadisticas/statistics.component';
import { ExpiryTimeComponent } from './fecha-expiracion/expiry-time.component';
import { ComplaintsComponent } from './quejas/complaints.component';
import { CategoriesComponent } from './categorias/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminComponent,
    StatisticsComponent,
    ExpiryTimeComponent,
    ComplaintsComponent,
    CategoriesComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports:[
    UsuariosComponent
  ]
})
export class AdminModule { }
