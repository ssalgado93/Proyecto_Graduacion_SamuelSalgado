import { Component, OnInit } from '@angular/core';
import { EquipoService, traerProducto, user,Images, editProducto, newProducto } from '../../SERVICES/equipo.service';
import { NewProductsComponent } from '../nuevo-producto/new-products.component';
import { ProductsComponent } from '../productos/products.component';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { formating } from 'src/assets';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-published-products',
  templateUrl: './published-products.component.html',
  styleUrls: ['./published-products.component.css']
})
export class PublishedProductsComponent implements OnInit {
  //newProducto[] se importa la clase

  productoList:traerProducto[]=[];
  categories:any[] = []
  expiratioDate:Date|null = null 
  public previsualizacion: any;
  public archivos: any = []; //Sera de tipo array
  public image: any; //Enviar una imagen a la vez al servidor
  public alertMsg=''
  public id_usuario = localStorage.getItem('token')
  constructor(private equipoService:EquipoService,private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.srcArray.length = 0
    this.getProducList()
    this.equipoService.getProductCategories().subscribe(res=>{
      this.categories = <any>res
    }, error =>{
      console.log(error) 
    })
    this.cargadas.length=0
    this.eliminadas.length=0
    this.alertMsg=''
  
  }


  getProducList(){
  this.equipoService.traeProd(localStorage.getItem('token')).subscribe(res=>{
    this.productoList=<any>res
    console.log(this.productoList)
   
  }, error =>{
    console.log(error)
})
  }
  
  borrarProd(id_product:string){

    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el artículo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'No',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        /// Llama a la funcion de borrar producto
        this.equipoService.borrarProducto(id_product).subscribe((res) =>{
          console.log('se elimino')
          this.ngOnInit()
          }, error => {
            console.log(error);
           })

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "Se ha eliminado el producto",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }



  
  srcArray: any = [];

  capturarFile(event: any) {
    console.log("este corresponde a editar");
    
    if (event.target.files.length > 0) {
      if (event.target.files.length <= 10) {
        let files = event.target.files;

        let file;
        for (let i = 0; i < files.length; i++) {
          if (this.archivos.length < 10) {
            file = files[i];
            this.archivos.push(file);
            const reader = new FileReader();
            reader.onload = (file) => {
              this.srcArray.push({
                img: reader.result,
                id: this.srcArray.length == 0 ? 0 : this.srcArray.length,
              });
            };
            reader.readAsDataURL(file);
          } else {
            window.alert('No mas de 10 imagenes');
          }
        }
      }else{
        window.alert('No mas de 10 imagenes');
      }
    }
  }
  deleteFile(id: number) {
    this.srcArray.splice(id, 1);
    this.archivos.splice(id, 1);

    for (let i = 0; i < this.srcArray.length; i++) {
      this.srcArray[i].id = i;
    }
  }
  

/////////////////////////////////////MODIFICAR


  //agregar el formGrup
  productoForm = new FormGroup({
    // nombre: new FormControl('',[Validators.required, Validators.minLength(2) ]),
    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    precio: new FormControl('', [Validators.required, Validators.minLength(2)]),
    categoria: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    decripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    ubicacion: new FormControl('', [Validators.required]),
  });
  /*
get nombreControl():FormControl{
  return this.loginForm.get('nombre') as FormControl
}*/

  get tituloControl(): FormControl {
    return this.productoForm.get('titulo') as FormControl;
  }
  get precioControl(): FormControl {
    return this.productoForm.get('precio') as FormControl;
  }
  get categoriaControl(): FormControl {
    return this.productoForm.get('categoria') as FormControl;
  }
  get estadoControl(): FormControl {
    return this.productoForm.get('estado') as FormControl;
  }
  get descripcionControl(): FormControl {
    return this.productoForm.get('decripcion') as FormControl;
  }
  get ubicacionControl(): FormControl {
    return this.productoForm.get('ubicacion') as FormControl;
  }
public fotos=[]
 
    setItem(id_product:string){
      localStorage.setItem("idProductoModal",id_product) //lo usamos despues para cargar el producto y actualizarlo
      this.equipoService.getUnProducto(localStorage.getItem("idProductoModal")).subscribe(res=>{
          this.producto = res[0]
          this.formating.format = this.producto2.dou_price
          if(this.producto2.categoria=='Indefinida'){
            this.alertMsg="La categoria de este producto ha sido eliminada del sistema, edita tu producto seleccionando otra categoria"
          }
      }, err=>console.log(err))
    }

    guardarCambios(){
        this.equipoService.updateProduct(localStorage.getItem("idProductoModal"), this.producto2).subscribe(res=>{
            this.ngOnInit()
        })
    }

  public eliminadas:any[]=[]
  public imag=[]
  public cargadas:any=[]

    imagenes(){
        this.equipoService.getimg(localStorage.getItem('idProductoModal')).subscribe(res=>{
          this.imag=<any>res
          for( let i=0; i<this.imag.length;i++){
            this.cargadas.push({id: i, nm: this.imag[i]})
          }
          console.log(this.cargadas)
        })
    }

    eliminar(id:string, _nm:string){
      this.cargadas.splice(id,1)
      for (let i = 0; i < this.cargadas.length; i++) {
        this.cargadas[i].id = i;
      }

      this.eliminadas.push({id:id, nm:_nm })
      console.log(this.cargadas)
      console.log(this.eliminadas)  
    }

   deleteImages(){
    this.equipoService.deleteFiles(this.eliminadas).subscribe(res=>{

    })
   }

   formatoFecha(fecha:string, bit_availability:boolean){
      if(bit_availability){
        return "Expira el " + fecha
      }else{
        return "El anuncio ya expiro"
      }

   }


/* Para subir Archivo*/
subirArchivo(): any {
  Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Publicación editada con exito',
  showConfirmButton: false,
  timer: 1500
})

  //Actualizar el producto
if(this.cargadas.length>=1){
  this.equipoService.updateProduct(localStorage.getItem("idProductoModal"), this.producto2).subscribe(res=>{
    console.log(res)
    this.ngOnInit()
   // var info: BookInfo2 = <any>res;
   
    

    //Recorre el arreglo de archivos
    this.archivos.forEach((archivo: any) => {
      const formularioDeDatos = new FormData();
      formularioDeDatos.append('image', archivo);
      console.log(archivo);

      //Sube archivo uno por uno
      this.equipoService.productoFoto(formularioDeDatos, localStorage.getItem("idProductoModal")).subscribe((res) => {
          console.log('Respuesta ', res);
        });
    });

     //delete files
     if(this.eliminadas.length!=0){
      this.deleteImages()
    }

    this.archivos.length=0
    this.srcArray.length=0
    this.ngOnInit()
  
  
    
  });
}else{
  alert("Debes cargar al menos una imagen")
}
}
  
  usuario: user = {
    fk_id_user: ''
  }

  public producto: newProducto = {
    fk_id_user:'',
    fk_id_department: '',
    fk_id_product_category: '',
    fk_id_product_status: '',
    var_name: '',
    text_description: '',
    dou_price: '0',
  };

  public producto2: editProducto = {
    fk_id_user: this.id_usuario,
    fk_id_department: '',
    fk_id_product_category: '',
    fk_id_product_status: '',
    var_name: '',
    text_description: '',
    dou_price: '0',
  };
  
////////////////////PAGINACION////////////////
pageSize=8;
desde:number= 0;
hasta:number=8;

cambiarPagina(e:PageEvent){
  console.log(e)
  this.desde=e.pageIndex*e.pageSize;
  this.hasta=this.desde+e.pageSize;
}

formating:formating={
  format:"L. 0.00"
}

formateo(event:Event) {
  const target = event.target as HTMLInputElement;
  target.value = this.producto2.dou_price;
  this.formating.format = this.producto2.dou_price;
  this.formating.format = this.producto2.dou_price;
}

transformAmount(event:Event) {
  const target = event.target as HTMLInputElement;
  this.formating.format = this.currencyPipe.transform(
    this.formating.format,
    'L. '
  );

  if (this.formating.format==null) {
    target.value = 'L. 0.00';
    this.producto2.dou_price = '0';
  }else{
    target.value = this.formating.format;
    this.producto2.dou_price = this.formating.format.substring(3).replace(/,/gi, '');
  }
  console.log(this.producto2.dou_price);
}


}

interface BookInfo {
  status : string ;
  msg: string;
}

interface BookInfo2 {
  status: string;
  id: string;
}