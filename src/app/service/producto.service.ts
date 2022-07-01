import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  registo_producto_admin(data:any,file:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categorias',data.categorias);
    fd.append('portada',file);

    return this._http.post(this.url+'registo_producto_admin',fd,{headers:headers});
  }

  listar_productos_admin(filtro:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_productos_admin/'+filtro,{headers:headers});
  }

  obtener_producto_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'obtener_producto_admin/'+id,{headers:headers});
  }

  actualizar_producto_admin(data:any,id:any,token:any):Observable<any>{
    if(data.portada){
      let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('stock',data.stock);
    fd.append('precio',data.precio);
    fd.append('descripcion',data.descripcion);
    fd.append('contenido',data.contenido);
    fd.append('categorias',data.categorias);
    fd.append('portada',data.portada);

    return this._http.put(this.url+'actualizar_producto_admin/'+id,fd,{headers:headers});

    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
      return this._http.put(this.url+'actualizar_producto_admin/'+id,data,{headers:headers});

    }

  }

  eliminar_producto_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_producto_admin/'+id,{headers:headers});
  }

  /*LISTAR INVENTARIO PRODUCTO*/
  listar_inventario_producto_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url+'listar_inventario_producto_admin/'+id,{headers:headers});
  }

  eliminar_inventario_producto_admin(id:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.delete(this.url+'eliminar_inventario_producto_admin/'+id,{headers:headers});
  }

  registro_inventario_producto_admin(data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.post(this.url+'registro_inventario_producto_admin/',data,{headers:headers});
  }



}
