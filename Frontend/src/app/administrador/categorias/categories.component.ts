import { Component, OnInit } from '@angular/core';
import { EquipoService, Categoria } from 'src/app/SERVICES/equipo.service';
import Swal from 'sweetalert2';

import { FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  categories:Categoria[] = []
  
  constructor( private EquipoService:EquipoService) { }

  categoryForm=new FormGroup({
    categoria: new FormControl('',[Validators.required]),
  });
  
  get categoriaControl():FormControl{
    return this.categoryForm.get("categoria") as FormControl
  }
  
  public category: Categoria= {
    id_product_category:3,
    var_name:''
  }

  ngOnInit(): void {
    this.listarCategorias()
  }

  listarCategorias(){
    this.EquipoService.getProductCategories().subscribe(res=>{
      this.categories = <any>res
      console.log(this.categories)
    }, error =>{
      console.log(error) 
    })
  }
 
  addCategory(){
    console.log(typeof this.category)
    console.log(this.category)
    this.EquipoService.addCategory(this.category).subscribe(
      res => {
        
        var status:BookInfo = <any>res
          //console.log(hola)
          if (status.status == '200') {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha agregado la categoria',
              showConfirmButton: false,
              timer: 1500
            })
            this.categoryForm.reset();
           
          }else if (status.status == '201'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La categoria ya existe',
        
            })
            this.categoryForm.reset();

          }else if(status.status=='0'){
            console.log("Error en la base de datos")
          }
        this.ngOnInit()
      
      },
      err => console.log(err)
    );
  }

 eliminar(fk_id_product_category: number, _var_name: string){
  this.category={
    id_product_category: fk_id_product_category,
    var_name: _var_name
  }
  //console.log(this.category)
  if(_var_name=="Indefinida"){
    
  Swal.fire({
    title: 'Si eliminas esta categoria los productos que pertenecen a ella tambien se eliminaran ¿Deseas continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'No',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {

      /// Llama a la funcion de borrar producto
      this.EquipoService.deleteCategory(this.category).subscribe(res =>{
    
        console.log(res)
       this.categoryForm.reset()
        }, error => {
          console.log(error);
         })
         
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Se ha eliminado la categoria y sus productos",
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.categoryForm.reset()
  })
  this.ngOnInit()
  }
else{

  Swal.fire({
    title: '¿Estás seguro que deseas eliminar la categoria?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    cancelButtonText: 'No',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {

      /// Llama a la funcion de borrar producto
      this.EquipoService.deleteCategory(this.category).subscribe(res =>{
       
        console.log(res)
       this.categoryForm.reset()
        }, error => {
          console.log(error);
         })

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: "Se ha eliminado",
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.categoryForm.reset()
  })
  this.ngOnInit()
}
 }


 getCategory(id_product_category: number){
    this.EquipoService.getCategory(id_product_category).subscribe(res=>{
      console.log(res)
      this.category=res[0]

    })
 }

 guardarCambios(){
    this.EquipoService.updateCategory(this.category).subscribe(res=>{
      var status:BookInfo = <any>res
         
          if (status.status == '200') {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Los cambios fueron guardados',
              showConfirmButton: false,
              timer: 1500
            })
            this.categoryForm.reset();
            
          }else if (status.status == '201'){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La categoria ya existe',
        
            })
            this.categoryForm.reset();

          }else if(status.status=='0'){
            console.log("Error en la base de datos")
          }
        this.ngOnInit()
      
      },
      err => console.log(err)
    );
    
 }

 limpiar(){
  this.categoryForm.reset()
 }
}
interface BookInfo {
  status : string ;
  id:string
}