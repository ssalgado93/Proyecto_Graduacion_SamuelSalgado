import { Component, OnInit } from '@angular/core';
import { EquipoService, login } from "../../SERVICES/equipo.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm=new FormGroup({
    email: new FormControl('', [Validators.email,Validators.required] ),
    password: new FormControl('', [Validators.required])
  });

  get emailControl():FormControl{
    return this.loginForm.get('email') as FormControl
  }

  get passControl():FormControl{
    return this.loginForm.get('password') as FormControl
  }
  
  login: login={
    var_email:"",
    tex_password:""
    }

  constructor(private EquipoService:EquipoService, private router: Router) { }

  ngOnInit(): void {
  }

  incorrect:boolean = false
  deleteUser:boolean = false
  error:boolean = false

  autenticar(){
    this.incorrect = false
    this.deleteUser = false
    this.error = false
    this.EquipoService.authLogin(this.login).subscribe(
      res => {
        var status:BookInfo = <any>res
        console.log(status.status)
        //console.log(hola)
        if (status.status == '200') {
          //this.EquipoService.setToken(status.id)
          localStorage.setItem('token',status.id)

          //Comprueba si es administrador
          this.EquipoService.getUserRol(status.id).subscribe(
            res=>{
              const respuesta:adminInfo = <any>res
              if(respuesta.rol){
                localStorage.setItem('isAdmin','true')
                console.log(respuesta.msg)
                this.router.navigate([`administrador`])
                
              }else{
                localStorage.setItem('isAdmin','false')
                this.router.navigate([`navegacionProductos`])
                
              }
              
            },
            err => console.log(err)
            );


        }else if(status.status == '1'){
          this.deleteUser = true
        }else if(status.status == '0'){
          this.incorrect = true
        }else{
          this.error = true
        }
      },
      err => this.error = true
    );

    
  }
  ruta:string = "home/register"
}



interface BookInfo {
  status : string ;
  id: string;
}

interface adminInfo {
  rol : boolean ;
  msg: string;
}

