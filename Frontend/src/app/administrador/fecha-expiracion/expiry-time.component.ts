import { Component, OnInit } from '@angular/core';
import {EquipoService} from "../../SERVICES/equipo.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expiry-time',
  templateUrl: './expiry-time.component.html',
  styleUrls: ['./expiry-time.component.css']
})
export class ExpiryTimeComponent implements OnInit {

  constructor(private equipoService:EquipoService) { }

  ngOnInit(): void {
    this.loadDays()
  }

  dias:string = ""
  expiryValue:string = ""

  loadDays(){
    this.equipoService.getExpiryTime().subscribe(res=>{
      const info:BookInfo = <any>res
      this.dias = info.msg
    }, error =>{
      console.log(error)
    })
  }

  actualizar(): void {
    
    if(this.expiryValue != ""){
      this.equipoService.setExpiryTime(this.expiryValue).subscribe(res=>{
        const info:BookInfo = <any>res
        if(info.status == 200){
          /*
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: info.msg,
              showConfirmButton: false,
              timer: 1000
          })*/
          this.loadDays()
        }else{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: info.msg,
            showConfirmButton: false,
            timer: 1000
          })
         
        }

      })
    }

    this.expiryValue=""
    
  }

}

interface BookInfo {
  status : number,
  msg: string;
}
