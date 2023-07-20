import { Component, OnInit} from '@angular/core';
import { EquipoService, Usuario, updateUsuario, updateUsuario2} from 'src/app/SERVICES/equipo.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  usuarios:Usuario[] = []
  usuarios2:updateUsuario[] = []
  usuarios3:updateUsuario2[] = []
  
  constructor( private EquipoService:EquipoService) { }

  usuarioForm=new FormGroup({
    bit_rol: new FormControl('',[Validators.required, Validators.minLength(1), Validators.pattern('[0-1]{1}')]),
  });
  
  get usuarioControl():FormControl{
    return this.usuarioForm.get("bit_rol") as FormControl
  }

  usuarioForm2=new FormGroup({
    bit_status: new FormControl('',[Validators.required,Validators.minLength(1), Validators.pattern('[0-1]{1}')]),
  });
  
  get usuarioControl2():FormControl{
    return this.usuarioForm2.get("bit_status") as FormControl
  }
  
  public user: Usuario= {
    id_user:'',
    var_name:'',
    var_lastname:'',
    bit_rol:'',
    bit_status:'',
  }

  public user2: updateUsuario= {
    id_user:0,
    bit_rol:''
  }

  public user3: updateUsuario2= {
    id_user:0,
    bit_status:''
  }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.EquipoService.getUsuarios().subscribe(res=>{
      this.usuarios = <any>res
      console.log(this.usuarios)
    }, error =>{
      console.log(error) 
    })
  }
 
  EliminarUsuario(_id_usuario:string, _var_name:string, _var_lastname:string, _bit_rol:string, _bit_status:string){
      this.user={id_user:_id_usuario, var_name: _var_name, var_lastname:_var_lastname, bit_rol:_bit_rol, bit_status:_bit_status}
      this.listarUsuarios()
    Swal.fire({
      title: 'Estas seguro que quieres dar de baja a este usuario ¿Deseas continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EquipoService.updateEstadoUsuario(_id_usuario).subscribe(res=>{
          console.log(this.user)
          console.log('Eliminado')
        }, error =>{
          console.log(error)
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Se ha eliminado el usuario",
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.usuarioForm.reset()
    })
    this.ngOnInit()
  }

  getOneUser(id_user: string){
    this.EquipoService.getOneUser(id_user).subscribe(res=>{
      console.log(res)
      this.user2=res[0]

    })
 }

 getOneUser2(id_user: string){
  this.EquipoService.getOneUser2(id_user).subscribe(res=>{
    console.log(res)
    this.user3=res[0]
  })
}

 guardarCambios(id_user: number) {
  this.EquipoService.updateUsuarios(this.user2).subscribe(res=>{
    var status:BookInfo = <any>res
        if (status.status == '200') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Los cambios fueron guardados',
            showConfirmButton: false,
            timer: 1500
          })
          this.usuarioForm.reset();
          
        }else if (status.status == '201'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe',
          })
          this.usuarioForm.reset();
        }else if(status.status=='0'){
          console.log("Error en la base de datos")
        }
      this.ngOnInit()
    },
    err => console.log(err)
  );
}
 

guardarCambios2(id_user: number) {
  this.EquipoService.updateUsuarios2(this.user3).subscribe(res=>{
    var status:BookInfo = <any>res
        if (status.status == '200') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Los cambios fueron guardados',
            showConfirmButton: false,
            timer: 1500
          })
          this.usuarioForm.reset();
          
        }else if (status.status == '201'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe',
          })
          this.usuarioForm.reset();
        }else if(status.status=='0'){
          console.log("Error en la base de datos")
        }
      this.ngOnInit()
    },
    err => console.log(err)
  );
}

 limpiar(){
  this.usuarioForm.reset()
 }

}
interface BookInfo {
  status : string ;
  id:string
}