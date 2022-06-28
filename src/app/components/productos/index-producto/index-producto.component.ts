import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = ''
  public token;
  //guardar
  public productos : Array<any> = [];
  public url:any;
  //paginación
  public page = 1;
  public pageSize = 20;

  constructor(
    //injectar servicio
    private _productoService : ProductoService,
    //private _adminService : AdminService
  ) {
    //obtener token desde locale storage
    this.token = localStorage.getItem('token')
    //this.token = this._adminService.getToken();
    this.url = GLOBAL.url;

  }

  ngOnInit(): void {
    // se usa en varias partes por eso lo almacenamos
    this.init_data();
  }
  init_data(){
    //utilizamos el servicio
    this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
      response =>{
        console.log(response);
        //insertar la data en el html en el for
        this.productos = response.data;
        //precargador
        this.load_data = false;
      },
      error =>{
        console.log(error);
      }
    )
  }
  //filtro
  filtrar(){
    if(this.filtro){
      this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
        response =>{
          console.log(response);
          //insertar la data en el html en el for
          this.productos = response.data;
          //precargador
          this.load_data = false;
        },
        error =>{
          console.log(error);
        }
      )

    }else{
      iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class:'text-danger',
          position: 'topRight',
          message: 'Ingrese filtro para buscar'
        });
    }
  }
  resetear(){
    this.filtro = '';
    this.init_data();
  }

}
