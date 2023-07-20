import { Component, OnInit } from '@angular/core';
import {ChartsService} from '../../SERVICES/charts.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  ruta:string = "home"
  constructor(private ChartsService:ChartsService) { }

  ngOnInit(): void {
    this.ChartsService.setViews().subscribe((data:any)=>{
      console.log(data);
      
    })
  }

}
