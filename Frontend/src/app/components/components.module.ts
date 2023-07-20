import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { GraphicComponent } from './graphic/graphic.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    FooterComponent,
    GraphicComponent
  ],
  imports: [
    NgChartsModule,
    CommonModule
  ],
  exports:[
    GraphicComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
