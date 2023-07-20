import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EquipoService {

  url ='http://localhost:4200/api'
  constructor(private http:HttpClient) { }

  $modalComplaint = new EventEmitter<any>();

  addUsuario(registro:Registro){
      return this.http.post(this.url+"/user", registro)
  }

  getDepartments(){
    return this.http.get(this.url+"/departament")

  }

  getProductCategories(){
    return this.http.get(this.url+"/productCategory")
  }

  getComplaintCategories(){
    return this.http.get(this.url+"/complaintCategories")
  }

  getProductos(){
    return this.http.get<newProducto[]>(this.url)
  }

  traeProd(id: string|null){
    return this.http.get(this.url+"/productUser/"+id)
  }

  addCodigo(codigo:codigo)/*: observable<any> */{
    return this.http.post(this.url+"/credential/confirm",codigo)
  }

  updatePassword(update:updatePassword){
      return this.http.put(this.url+"/userPassword", update)
  }


  authLogin(auth:login){
      return this.http.post(this.url+"/auth", auth)
  }

  getUser(id:string){
    return this.http.get(this.url+"/user/"+id)
  }

  getUserRol(id:string){
    return this.http.get(this.url+"/userRol/"+id)
  }

  emailModule1(module1:emailCredential){
    return this.http.post(this.url+"/credential", module1)
  }

  newProducto(newProduct:newProducto){
    return this.http.post(this.url+"/newProduct",newProduct)
  }

  eliminarProducto(id:string):Observable<any>{
    return this.http.delete(this.url +id);
  }
  productoFoto(file:FormData, id:string|null){
    return this.http.post(this.url +"/product/postImage/"+id,file);
  }

  filtrar(filtro:filter){
    return this.http.post(this.url+"/productFiltering", filtro)
  }

  addsubscription(suscribirse:subscribe){
    return this.http.post(this.url+"/subscribeCategory", suscribirse)
  }

  getSubscriptions(id_user:string){
    return this.http.get(this.url+"/getSubscriptions/" + id_user)
  }

  listWishlist(id:string|null){
    return this.http.get(this.url+"/getFavs/"+id)
  }

  deleteWishlist(data:deleteWishlist){
    return this.http.post(this.url+"/deleteFav",data)
  }

  addWishlist(data:deleteWishlist){
    return this.http.post(this.url+"/addFav",data)
  }

  deleteSubscription(eliminarSuscripcion:subscribe){
    return this.http.post(this.url+"/unsubscribeCategory", eliminarSuscripcion)
  }

  borrarProducto(id: String ){
    return this.http.delete(this.url+"/productDelete/"+id)
  }


  //Trae los usuario con denuncias
  getUserDenuncia(){
    return this.http.get(this.url+"/admin/listUser")
  }

  getOneProduct(id: string|null){
    return this.http.get(this.url+"/getProducto/"+id)
  }
// Lista de Denuncias por usuario
  getOneDenuncias(id:string){
    return this.http.get(this.url+"/admin/getDenuncias/"+id)
  }

  getUnProducto(id_producto:string|null){
    return this.http.get<newProducto[]>(this.url+"/getProdMod/"+id_producto)
  }

  getImages(id:string){
    return this.http.get(this.url+"/productImages/"+id)
  }

  qualify(qlfy: qualification){
    return this.http.post(this.url+"/addcalifications", qlfy)
  }

  addComplaint(denuncia: complaint){
    return this.http.post(this.url+"/adddenuncia",denuncia)
  }

  views(id:string|null){
    return this.http.get(this.url+"/vista/"+id)
  }

  addComment(comentario: Comment){
    return this.http.post(this.url+"/addComment", comentario)
  }

  getProductComments(fk_id_product: string|null){
    return this.http.get(this.url+"/comments/"+fk_id_product)
  }

  getAVG(fk_id_user_qualified:number){
    return this.http.get(this.url+"/prom/"+fk_id_user_qualified)
  }

  updateProduct(id_product:string|null, product:newProducto){
    return this.http.put(this.url+"/editProduct/"+id_product, product)
  }

  getimg(fk_id_product:null|string){
    return this.http.get(this.url+"/imagenes/"+fk_id_product)
  }

  deleteFiles(filesArr:any){
    return this.http.post(this.url+"/deleteFiles", filesArr)
  }

  addCategory(category:Categoria){
    return this.http.post(this.url+"/admin/addCategory",category)
  }

  updateCategory(category: Categoria){
    return this.http.post(this.url+"/admin/updateCategory/", category)
  }

  deleteCategory(categoria: Categoria){
    return this.http.put(this.url+"/admin/deleteCategory",categoria)
  }
  getCategory(id_product_category: number){
    return this.http.get<Categoria[]>(this.url+"/admin/getCategory/"+ id_product_category)
  }
  //Modificar Estado del usuario
  updateEstadoUsuario(id_user:string){
    return this.http.delete(this.url+"/admin/updateEstado/"+id_user)
  }

  getExpiryTime(){
    return this.http.get(this.url+"/product/expiryTime")
  }

  setExpiryTime(days:String){
    return this.http.get(this.url+"/product/expiryTime/"+days)
  }
  //Eliminar denuncias
  deleteDenuncia(id:any){
    return this.http.delete(this.url+"/admin/deleteDenuncia/"+id)
  }

  getOneScore(getScore:getQualification){
    return this.http.post(this.url+"/individualScore",getScore)
  }

  isQualifying(id_chat:number){
    return this.http.get(this.url+"/chat/isQualifying/"+id_chat)
  }

//listar usuarios
  getUsuarios(){
    return this.http.get(this.url+"/admin/getUsuarios")
  }
  getOneUser(id_user: string){
    return this.http.get<updateUsuario[]>(this.url+"/admin/getOneUser/"+id_user)
  }
  getOneUser2(id_user: string){
    return this.http.get<updateUsuario2[]>(this.url+"/admin/getOneUser2/"+id_user)
  }

//modificar usuarios
  updateUsuarios(id_user:updateUsuario){
    return this.http.post(this.url+"/updateUsuarios/",id_user)
  }

  updateUsuarios2(id_user:updateUsuario2){
    return this.http.post(this.url+"/updateUsuarios2/",id_user)
  }
}



export interface filter{
  fk_id_department: string,
  dou_price:string,
  fk_id_product_category:string,
  id_user:string|null
}

export interface traerProducto{
  id_photographs : number,
  id_product:string,
  var_name_photo: string,
  categoria: string,
  fk_id_user: number,
  fk_id_department: number,
  var_name: string,
  text_description: string,
  dou_price: string,
  publication_date: string,
  expiration_date: string,
  whishlist:string
  bit_availability:boolean
}

export interface wishListProducts{
  id_photographs : number,
  id_product: number,
  var_name_photo: string,
  var_name: string,
  text_description: string,
  dou_price: string
}

export interface Registro{
  fk_id_department:number,
  var_email:string,
  var_name:string,
  var_lastname:string,
  tex_password:string,
  bit_status:number,
  var_phone:string
}

export interface updatePassword{
  var_email:string,
  tex_password:string,
  tex_pass_ver:string
}

export interface status{
  status:number
}
export interface codigo{
  var_code:string,
  var_email:string
}

export interface login{
  var_email:string,
  tex_password:string
}

export interface emailCredential{
  var_email:string,
  bit_status:string
}

export interface newProducto {
    fk_id_user: string | null
    fk_id_department: string
    fk_id_product_category: string
    fk_id_product_status: string
    var_name: string
    text_description: string
    dou_price: string |any
    categoria?:string
}

export interface uploadPhoto{
  file:FormData | null,
  fk_id_product: string
}

export interface subscribe{
  fk_id_user: string | null
  fk_id_product_category: string
}

export interface requestSubscriptions{
  status: string
  msg: subscription[]

}

export interface subscription{
  var_name: string
  id_product_category: number

}

export interface user{
  fk_id_user: string|null
}

export interface deleteWishlist{
  id_user:string|null
  id_product:string
}

export interface deleteProduct{
  id_product:string
}

export interface getProduct{
  id_product: number,
  fk_id_user : number,
  titulo: string,
  text_description: string,
  int_views: number,
  dou_price: number,
	nombre: string,
  apellido: string,
  categoria: string,
  departamento: string,
  estado: string,
  status: string
}

export interface Images{
  var_name:string,
  var_extension?: string
}

export interface qualification{
  fk_id_user_review: string| null,
  fk_id_user_qualified: number,
  tin_score: number
}

export interface getQualification{
  fk_id_user_review: string,
  fk_id_user_qualified: string

}

export interface complaint{
  fk_id_user: string,
  fk_id_product: string| null,
  fk_id_complaint_category: string,
  text_description: string
}

export interface Comment{
  fk_id_user: string,
  fk_id_product: string,
  text_contents: string
}

export interface reqQualify{
  status: string
  msg: string
}

export interface loadComment{
  var_name: string,
  var_lastname: string,
  text_contents: string,
  dateComment: string,
  hourComment:string
}
export interface promedio{
  PROMEDIO: number;
}

export interface Categoria{
  id_product_category: number;
  var_name:string;
}

export interface Usuario{
  id_user: string;
  var_name:string;
  var_lastname:string;
  bit_rol:string;
  bit_status:string;
}


//Crear una nueva interfaz para denuncias

export interface ListadoUsuario{
  id_user: string,
  var_name: string,
  var_lastname: string,
  Denuncias1: string

}

export interface DenunciasUsuario{
  id_COMPLAINT: string,
  NombreCategoria: string,
  NombreUsuario:string,
  SegundoNombre:string,
  Descripcion:string,
  tim_date: string,
  dateComplaint: String,
  hourComplaint: string
}

export interface updateUsuario{
  id_user:number,
  bit_rol:string
}

export interface updateUsuario2{
  id_user:number,
  bit_status:string
}