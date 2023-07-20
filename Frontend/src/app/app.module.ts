import { NgModule } from '@angular/core';

import { CargarScriptsService} from "./cargar-scripts.service";

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CredentialRecoveryModule } from './credential-recovery/credential-recovery.module';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NavigationLayoutComponent } from './layouts/navigation-layout/navigation-layout.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    NavigationLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CredentialRecoveryModule,
    NgChartsModule
  ],
  providers: [CargarScriptsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
