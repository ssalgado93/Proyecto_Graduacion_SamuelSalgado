import { Component, OnInit} from '@angular/core';
import { EquipoService, Bitacora} from 'src/app/SERVICES/equipo.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css']
})



export class bitacoraComponent implements OnInit {
  


  
  constructor( private EquipoService:EquipoService) { }


  bitacoraForm=new FormGroup({
    var_name: new FormControl('',[Validators.required, Validators.minLength(1), Validators.pattern('[0-1]{1}')]),
  });
  
  get usuarioControl():FormControl{
    return this.bitacoraForm.get("var_name") as FormControl
  }

  public log: Bitacora= {
    var_name:'',
    var_lastname:'',
    action:'',
    date:'',
    category_name:'',
  }

  ngOnInit(): void {
    this.listarBitacora();
  }

  listarBitacora(){
    this.EquipoService.getBitacora().subscribe(res=>{
      this.log = <any>res
      console.log(this.log)
    }, error =>{
      console.log(error) 
    })
  }
 
}
interface BookInfo {
  status : string ;
  id:string
}