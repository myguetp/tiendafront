import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

public id:any;
public token:any;
public producto : any = {}
public inventarios: Array<any>=[];

public load_btn= false;

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
  ) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        console.log(this.id);
        //usamos el sercvice de producto para usar su metodo traer la datos
        this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            }else{
              this.producto = response.data;

              //inventario
              this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
                response =>{
                  console.log(response);
                  this.inventarios = response.data;
                },
                error =>{
                  console.log(error);
                }
              )

            }
          },
          error =>{
            console.log(error)
          }
        )


      }
      );
  }

  eliminar(id:any){
    this.load_btn=true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response =>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#FF0000',
          color: '#1DC74C',
          class:'text-success',
          position: 'topRight',
          message: 'se elimino correctamente el producto.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response =>{
            console.log(response);
            this.inventarios = response.data;
          },
          error =>{
            console.log(error);
          }
        )
      },
      error=>{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#1DC74C',
          class:'text-danger',
          position: 'topRight',
          message: 'Ocurrio error en el servidor.'
        });
        this.load_btn = false;
        console.log(error);
      }
    )
  }

}
