import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from 'src/app/service/GLOBAL';
import { ProductoService } from 'src/app/service/producto.service';
declare var iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : any = {};
  public config : any = {};
  public imgSelect? :  String | ArrayBuffer | null;
  public load_btn = false;
  //guardar el identificador que pasmos por ruta
  public id:any;
  public token:any;
  public url:any;
  public file: File = undefined!;


  constructor(
    private _route : ActivatedRoute,
    private _productoService: ProductoService,
    private _router : Router
  ) {
    this.config = {
      height: 500
    }
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    //confirmamos que traiga id
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
              this.imgSelect = this.url+'obtener_portada/'+this.producto.portada;

            }
          },
          error =>{
            console.log(error)
          }
        )


      }
      );
  }

  actualizar(actualizarForm:any){
    if(actualizarForm.valid){

    //paramwetros que requiere els ervice de actualizar
      var data: any =  {};

      if(this.file != undefined){
        data.portada = this.file;
      }

      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion
      data.contenido = this.producto.contenido

      this.load_btn = true;

    //actualizar el producto usamos el emtodo que esta en el service
      this._productoService.actualizar_producto_admin(data,this.id,this.token).subscribe(
        response =>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#FF0000',
            color: '#1DC74C',
            class:'text-success',
            position: 'topRight',
            message: 'se actualizoo correctamente nuevo producto.'
          });

          this.load_btn = false;
          //Redireccion
          this._router.navigate(['/panel/productos']);
        },
        error =>{
          console.log(error);
          this.load_btn = false;
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'los datos no son validos'
      });
      this.load_btn = false;
    }
  }

  fileChangeEvent(event:any):void{
    var file;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];

    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'No existe una imagen'
      });
      $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined!;
    }
    //validar variable file tamaño
    if(file?.size! <= 400000){
      //asd
      if(file?.type == 'image/png' || file?.type == 'image/jpg'
      || file?.type == 'image/webp' || file?.type == 'image/gif'
      || file?.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        console.log(this.imgSelect)
        reader.readAsDataURL(file);

        $('#input-portada').text(file.name);
        this.file = file;
      }else{
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class:'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined!;
      }
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class:'text-danger',
        position: 'topRight',
        message: 'imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined!;
    }

    console.log(this.file);
  }

}
