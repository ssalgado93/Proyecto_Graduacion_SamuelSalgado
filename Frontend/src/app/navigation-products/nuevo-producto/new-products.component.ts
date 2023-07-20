import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { newProducto, EquipoService } from '../../SERVICES/equipo.service';
import {formating} from '../../../assets'

@Component({
  selector: 'new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.css'],
})
export class NewProductsComponent implements OnInit {
  public previsualizacionNew: any;
  public archivosNew: any = []; //Sera de tipo array
  public imageNew: any; //Enviar una imagen a la vez al servidor
  categoriesNew: any[] = [];

  constructor(private equipoService: EquipoService, private raute: Router, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    
    // Traer todas las categorias
    this.equipoService.getProductCategories().subscribe(
      (res) => {
        this.categoriesNew = <any>res;
      },
      (error) => {
        console.log(error);
      }
    );
    this.srcArrayNew.length = 0;
    this.archivosNew.length = 0;
    this.productoFormNew.reset();
  }

  //agregar el formGrup
  productoFormNew = new FormGroup({
    // nombre: new FormControl('',[Validators.required, Validators.minLength(2) ]),
    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    precio: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    decripcion: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    ubicacion: new FormControl('', [Validators.required]),
  });
  /*
get nombreControl():FormControl{
  return this.loginForm.get('nombre') as FormControl
}*/

  get tituloControlNew(): FormControl {
    return this.productoFormNew.get('titulo') as FormControl;
  }
  get precioControlNew(): FormControl {
    return this.productoFormNew.get('precio') as FormControl;
  }
  get categoriaControlNew(): FormControl {
    return this.productoFormNew.get('categoria') as FormControl;
  }
  get estadoControlNew(): FormControl {
    return this.productoFormNew.get('estado') as FormControl;
  }
  get descripcionControlNew(): FormControl {
    return this.productoFormNew.get('decripcion') as FormControl;
  }
  get ubicacionControlNew(): FormControl {
    return this.productoFormNew.get('ubicacion') as FormControl;
  }

  srcArrayNew: any = [];

  capturarFileNew(event: any) {
    console.log('este corresponde a nuevo');

    if (event.target.files.length > 0) {
      if (event.target.files.length <= 10) {
        let files = event.target.files;

        let file;
        for (let i = 0; i < files.length; i++) {
          if (this.archivosNew.length < 10) {
            file = files[i];
            this.archivosNew.push(file);
            const reader = new FileReader();
            reader.onload = (file) => {
              this.srcArrayNew.push({
                img: reader.result,
                id: this.srcArrayNew.length == 0 ? 0 : this.srcArrayNew.length,
              });
            };
            reader.readAsDataURL(file);
          } else {
            window.alert('No mas de 10 imagenes');
          }
        }
      } else {
        window.alert('No mas de 10 imagenes');
      }
    }
  }

  deleteFileNew(id: number) {
    this.srcArrayNew.splice(id, 1);
    this.archivosNew.splice(id, 1);

    for (let i = 0; i < this.srcArrayNew.length; i++) {
      this.srcArrayNew[i].id = i;
    }
  }

  productoNew: newProducto = {
    fk_id_user: '',
    fk_id_department: '',
    fk_id_product_category: '',
    fk_id_product_status: '',
    var_name: '',
    text_description: '',
    dou_price: '0',
  };

  /* Para subir Archivo*/
  subirArchivoNew(): any {
    //Sube el producto

    if (this.srcArrayNew.length >= 1) {
      this.equipoService.newProducto(this.productoNew).subscribe((res) => {
        var info: BookInfo = <any>res;

        //Recorre el arreglo de archivos
        this.archivosNew.forEach((archivo: any) => {
          const formularioDeDatos = new FormData();
          formularioDeDatos.append('image', archivo);
          console.log(archivo);

          //Sube archivo uno por uno
          this.equipoService
            .productoFoto(formularioDeDatos, info.id)
            .subscribe((res) => {
              console.log('Respuesta ', res);
            });
        });
        this.archivosNew.length = 0;
        this.srcArrayNew.length = 0;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto cargado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.productoFormNew.reset();
        this.raute.navigate([`navegacionProductos/publicados`]);
      });
    } else {
      alert('Debes cargar al menos una imagen');
    }
  }

  formatingNew:formating={
    format:"L. 0.00"
  }

  formateoNew(event: Event) {
    const target = event.target as HTMLInputElement;
    target.value = this.productoNew.dou_price;
    this.formatingNew.format = this.productoNew.dou_price.replace(',', '');
    this.formatingNew.format = this.productoNew.dou_price.replace('.00', '');
  }

  transformAmountNew(event: Event) {
    const target = event.target as HTMLInputElement;
    this.formatingNew.format = this.currencyPipe.transform(
      this.formatingNew.format,
      'L. '
    );

    if (this.formatingNew.format == null) {
      target.value = 'L. 0.00';
      this.productoNew.dou_price = '0';
    } else {
      target.value = this.formatingNew.format;
      this.productoNew.dou_price = this.formatingNew.format
        .substring(3)
        .replace(/,/gi, '');
    }
    console.log(this.productoNew.dou_price);
  }
}

interface BookInfo {
  status: string;
  id: string;
}
